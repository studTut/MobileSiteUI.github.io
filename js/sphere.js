let camera, scene, renderer, cube, material;

const height = window.innerHeight;
const width = window.innerWidth;

var alpha = 0, beta = 0, gamma = 0;
 
window.addEventListener("deviceorientation", (dat) => {
    alpha = dat.alpha;  // z軸（反時計回り）
    beta  = dat.beta;   // x軸（引き起こす）
    gamma = dat.gamma;  // y軸（右に傾ける）
});

//unit = 1;

if (height <= width) {
	unit = height/600;
} else {
	unit = width/600;
};

//unit = width/400;

function init() {
	// Init scene
	scene = new THREE.Scene();

	// Init camera (PerspectiveCamera)
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);

	camera.rotation.x = 45;

	// Init renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });

	// Set size (whole window)
	renderer.setSize(window.innerWidth, window.innerHeight);

	// Render to canvas element
	document.body.appendChild(renderer.domElement);


	const geometry = new THREE.SphereGeometry(1, 14, 14);
	
	material = new THREE.MeshNormalMaterial();

	

	cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
	// Position camera
	camera.position.z = 5;
}

// Draw the scene every time the screen is refreshed
function animate() {
	requestAnimationFrame(animate);

	// Rotate cube (Change values to change speed)
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

    	camera.rotation.x = -10 + beta/40;
    	camera.rotation.y = gamma/40;

	renderer.render(scene, camera);
}


function onWindowResize() {
	// Camera frustum aspect ratio
	camera.aspect = window.innerWidth / window.innerHeight;
	// After making changes to aspect
	camera.updateProjectionMatrix();
	// Reset size
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
