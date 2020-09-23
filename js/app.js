var camera, scene, renderer;
var controls;
var object;

var alpha = 0, beta = 0, gamma = 0;
var line = 200;
var space = line * 1.1;
var move;
var scroll;

function setSwipe(elem) {
    let t = document.querySelector(elem);
    let startY;        // タッチ開始 y座標
    let moveY;    // スワイプ中の y座標
    let dist = 10;    // スワイプを感知する最低距離（ピクセル単位）
     
    // タッチ開始時： xy座標を取得
    t.addEventListener("touchstart", function(e) {
        e.preventDefault();
        startY = e.touches[0].pageY;
    });
     
    // スワイプ中： xy座標を取得
    t.addEventListener("touchmove", function(e) {
        e.preventDefault();
        moveY = e.changedTouches[0].pageY;
	move = -1 * startY - moveY;
	
    });
	scroll += move;
}

window.addEventListener("deviceorientation", (dat) => {
    alpha = dat.alpha;  // z軸（反時計回り）
    beta  = dat.beta;   // x軸（引き起こす）
    gamma = dat.gamma;  // y軸（右に傾ける）
});

init();
animate();

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        1, 
        5000
    );
    
    camera.position.z = 1000;

  //  object1 = new THREE.CSS3DObject(document.getElementById('num1'));
  //  scene.add(object1);
  //  object1.position.x = -1*space;
  //  object1.position.y = space;
    
   // object2 = new THREE.CSS3DObject(document.getElementById('num2'));
    //scene.add(object2);
    //object2.position.x = space;
    //object2.position.y = space;
    
    //object3 = new THREE.CSS3DObject(document.getElementById('num3'));
    //scene.add(object3);
    //object3.position.x = -1*space;
    //object3.position.y = -1*space;

    //object4 = new THREE.CSS3DObject(document.getElementById('num4'));
    //scene.add(object4);
    //object4.position.x = space;
    //object4.position.y = -1*space;

    object5 = new THREE.CSS3DObject(document.getElementById('num5'));
    scene.add(object5);
    object5.position.x = 0;
    object5.position.y = 1.5*space;
    object5.position.z = 3*space;
    
    object6 = new THREE.CSS3DObject(document.getElementById('text'));
    scene.add(object6);
    object6.position.x = 0;
    object6.position.y = 0;
    object6.position.z = space;
    object6.rotation.x = 90;
	object6.rotation.z = 90;


    // CSS3Dレンダラー
    renderer = new THREE.CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight); 
    renderer.domElement.style.position = 'absolute'; // スタイル設定
    document.getElementById('container').appendChild(renderer.domElement); //#containerにappend
    // カメラコントローラー
    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.5; // 感度設定
    controls.addEventListener('change', render); // 値が変わった（マウスで何か位置が変更された）ときに render() を呼び出す

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    // カメラ設定
    camera.aspect = window.innerWidth / window.innerHeight; // カメラの縦横比を再設定
    camera.updateProjectionMatrix(); // 更新
    renderer.setSize(window.innerWidth, window.innerHeight); // レンダリングサイズを再設定
}



function animate() {
    requestAnimationFrame(animate);
    //camera.rotation.x = 30 + beta/30;
    object6.rotation.x = 30 + beta/30;
	//camera.rotation.y = gamma/30;
    if(beta <= 50) {
    object5.rotation.x = 30 -1*beta/15;
    } else {
	    object5.rotation.x = 26;
    }
    //object5.rotation.y = -1*gamma/15;
    object6.position.y += scroll;
    document.querySelector('#num5').style.backgroundColor = 'hsl(270,50%,50%)'

    renderer.render(scene, camera);
}


function render() {
    renderer.render(scene, camera);
}
