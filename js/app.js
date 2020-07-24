var camera, scene, renderer;
var controls;
var object;

var alpha = 0, beta = 0, gamma = 0;
var line = 200;
var space = line * 1.1;

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

    object1 = new THREE.CSS3DObject(document.getElementById('num1'));
    scene.add(object1);
    object1.position.x = -1*space;
    object1.position.y = space;
    
    object2 = new THREE.CSS3DObject(document.getElementById('num2'));
    scene.add(object2);
    object2.position.x = space;
    object2.position.y = space;
    
    object3 = new THREE.CSS3DObject(document.getElementById('num3'));
    scene.add(object3);
    object3.position.x = -1*space;
    object3.position.y = -1*space;

    object4 = new THREE.CSS3DObject(document.getElementById('num4'));
    scene.add(object4);
    object4.position.x = space;
    object4.position.y = -1*space;

    object5 = new THREE.CSS3DObject(document.getElementById('num5'));
    scene.add(object5);
    object5.position.x = 0;
    object5.position.y = 1.3*space;
    object5.position.z = 3*space;


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
    camera.rotation.x = 30 + beta/30;
	//camera.rotation.y = gamma/30;
    if(beta <= 65) {
    object5.rotation.x = 30 -1*beta/15;
    } else {
	    object5.rotation.x = 26;
    }
    //object5.rotation.y = -1*gamma/15;
    document.querySelector('#num5').style.backgroundColor = 'hsl(270,50%,50%)'

    renderer.render(scene, camera);
}


function render() {
    renderer.render(scene, camera);
}
