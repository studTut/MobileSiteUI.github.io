var camera, scene, renderer;
var controls;
var object;

var alpha = 0, beta = 0, gamma = 0;
var line = 200;
var space = line * 1.1;

function ClickRequestDeviceSensor(){
  //. ユーザーに「許可」を求めるダイアログを表示
  DeviceOrientationEvent.requestPermission().then( function( response ){
    if( response === 'granted' ){
      //. 許可された場合のみイベントハンドラを追加できる
      window.addEventListener( "deviceorientation", deviceOrientation );
      //. 画面上部のボタンを消す
      $('#sensorrequest').css( 'display', 'none' );
    }
  }).catch( function( e ){
    console.log( e );
  });
}

//. DeviceOrientationEvent オブジェクトが有効な環境か？　をチェック
if( window.DeviceOrientationEvent ){
  //. iOS13 以上であれば DeviceOrientationEvent.requestPermission 関数が定義されているので、ここで条件分岐
  if( DeviceOrientationEvent.requestPermission && typeof DeviceOrientationEvent.requestPermission === 'function' ){
    //. iOS 13 以上の場合、
    //. 画面上部に「センサーの有効化」ボタンを追加
    var banner = '<div  style="z-index: 1; position: absolute; width: 100%; background-color: rgb(0, 0, 0);" onclick="ClickRequestDeviceSensor();" id="sensorrequest"><p style="color: rgb(0, 0, 255);">センサーの有効化</p></div>';
    $('body').prepend( banner );
  }else{
    //. Android または iOS 13 未満の場合、
    //. DeviceOrientationEvent オブジェクトが有効な場合のみ、deviceorientation イベント発生時に deviceOrientaion 関数がハンドリングするよう登録
    window.addEventListener( "deviceorientation", deviceOrientation );
  }
}



window.addEventListener("deviceorientation", (e) => {
    e.preventDefault();
    
    alpha = e.alpha;  // z軸（反時計回り）
    beta  = e.beta;   // x軸（引き起こす）
    gamma = e.gamma;  // y軸（右に傾ける）
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
    camera.rotation.x = -20 + beta/30;
    camera.rotation.y = gamma/30;
    renderer.render(scene, camera);
}


function render() {
    renderer.render(scene, camera);
}

