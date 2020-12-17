var camera, scene, renderer;
var controls;
var object;

var alpha=0, beta=0, gamma=0;
var line = 200;
var space = line * 1.1;
var move;
var no = 1;				// 数値格納用
var number;			// 数値表示部分のDOM取得用
var posY = -3800;
var initbeta;



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
	
	window.addEventListener("load", function(){
	// 数値表示部分のDOM取得
	number = document.getElementById("number");
	
	// 数値を画面に表示
	no = 0;
	setNumber();

	// スワイプイベント設定
	setSwipe("#text");
});
}

function onWindowResize() {
    // カメラ設定
    camera.aspect = window.innerWidth / window.innerHeight; // カメラの縦横比を再設定
    camera.updateProjectionMatrix(); // 更新
    renderer.setSize(window.innerWidth, window.innerHeight); // レンダリングサイズを再設定
}



function animate() {
    requestAnimationFrame(animate);

    if(beta <= 50) {
    object5.rotation.x = 5 -1*beta/10;
    object5.position.y = 2000 -2000*beta/50;
    } else {
	    object5.rotation.x = 0;
	    object5.position.y = 0;
    }
	

 if(posY >= -3800 && posY <= 3800) {
	 object6.position.y = posY;
    } else if (posY < -3800 ){
	    object6.position.y = -3800;
    } else if (posY > 4000) {
	    object6.position.y = 4000;
    }
   
    document.querySelector('#num5').style.backgroundColor = 'hsl(180,50%,50%)'

    renderer.render(scene, camera);
}


function render() {
    renderer.render(scene, camera);
}

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
		if (startY > moveY && startY > moveY + dist) {		// 右から左にスワイプ
			if (posY <= 4000) {
				posY +=0.1*(startY - moveY);
			} else {
				posY += 0;
			}
			previous();
		}
		else if (startY < moveY && startY + dist < moveY) {	// 左から右にスワイプ
			
			if (posY >= -3800) {
				posY -= 0.1*(moveY - startY);
			} else {
				posY -= 0;
			}
			next();
		}
	});
	
	// タッチ終了時： スワイプした距離から左右どちらにスワイプしたかを判定する/距離が短い場合何もしない
	/*
	t.addEventListener("touchend", function(e) {
		if (startY > moveY && startY > moveY + dist) {		// 右から左にスワイプ
			posY += startY - moveY; 
			previous();
		}
		else if (startY < moveY && startY + dist < moveY) {	// 左から右にスワイプ
			posY -= moveY - startY;
			next();
		}
	});
	*/
}
function next(){
	no = Math.round(posY);
	setNumber();
}

/*
 * 前の番号を表示
 */
function previous(){
	no = Math.round(posY);
	setNumber();
}

/*
 * 数値を画面に表示する*/

function setNumber(){
	number.innerHTML = no;
}



