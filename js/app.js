var camera, scene, renderer;
var controls;
var object;

var alpha = 0, beta = 0, gamma = 0;
var line = 200;
var space = line * 1.1;
var move;
var scroll;
var no;				// 数値格納用
var number;
var posY = 0;



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
    object5.position.z = 2*space;
    
    object6 = new THREE.CSS3DObject(document.getElementById('text'));
    scene.add(object6);
    object6.position.x = 0;
    object6.position.y = 0;
    object6.position.z = 0;
   // object6.rotation.x = 90;
	//object6.rotation.z = 90;

	function setSwipe(elem) {
	let t = document.querySelector(elem);
	let startX;		// タッチ開始 x座標
	let startY;		// タッチ開始 y座標
	let moveX;	// スワイプ中の x座標
	let moveY;	// スワイプ中の y座標
	let dist = 30;	// スワイプを感知する最低距離（ピクセル単位）
	
	// タッチ開始時： xy座標を取得
	t.addEventListener("touchstart", function(e) {
		e.preventDefault();
		startX = e.touches[0].pageX;
		startY = e.touches[0].pageY;
	});
	
	// スワイプ中： xy座標を取得
	t.addEventListener("touchmove", function(e) {
		e.preventDefault();
		moveX = e.changedTouches[0].pageX;
		moveY = e.changedTouches[0].pageY;
	});
	
	// タッチ終了時： スワイプした距離から左右どちらにスワイプしたかを判定する/距離が短い場合何もしない
	t.addEventListener("touchend", function(e) {
		if (startY > moveY && startY > moveY + dist) {		// 下から上スワイプ
			posY -= startY - moveY;
		}
		else if (startY < moveY && startY + dist < moveY) {	// 上から下にスワイプ
			posY += startY - moveY;
		}
	});
}

/*
 * 起動時の処理
 window.addEventListener("load", function(){
	// スワイプイベント設定
	setSwipe("#container");
});
 */


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
    //object6.rotation.x = 30 + beta/30;
    //camera.rotation.y = gamma/30;
    //object5.position.y -= beta/30;
    if(beta <= 50) {
    object5.rotation.x = 5 -1*beta/10;
    object5.position.y = 2000 -2000*beta/50;
    } else {
	    object5.rotation.x = 0;
	    object5.position.y = 0;
    }
    //object5.rotation.y = -1*gamma/15;
    object6.position.y = posY;
    document.querySelector('#num5').style.backgroundColor = 'hsl(310,50%,50%)'

    renderer.render(scene, camera);
}


function render() {
    renderer.render(scene, camera);
}
