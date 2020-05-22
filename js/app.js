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



