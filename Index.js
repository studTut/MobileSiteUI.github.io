let camera, scene, renderer, cube, material;

const height = window.innerHeight;
const width = window.innerWidth;
const beta0 = dat.beta;

var alpha = 0, beta = 0, gamma = 0;

window.addEventListener("deviceorientation", (dat) => {
    alpha = dat.alpha;
    beta  = dat.beta;
    gamma = dat.gamma;
});

//unit = 1;

if (height <= width) {
	unit = height/400;
} else {
	unit = width/400;
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

	// Init renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });

	// Set size (whole window)
	renderer.setSize(window.innerWidth, window.innerHeight);

	// Render to canvas element
	document.body.appendChild(renderer.domElement);

	// Init BoxGeometry object (rectangular cuboid)
	const geometry = new THREE.BoxGeometry(unit, unit, unit);
	//const geometry = new THREE.SphereGeometry( unit/2, 8, 8 );

	// Create material with color
	// material = new THREE.MeshBasicMaterial({ color: "hsl(360, 100%, 50%)" });
	 material = new THREE.MeshNormalMaterial();

	
	// Create mesh with geo and material
	cube = new THREE.Mesh(geometry, material);
	// Add to scene
	scene.add(cube);

	// Position camera
	camera.position.z = 5;
}

// Draw the scene every time the screen is refreshed
function animate() {
	requestAnimationFrame(animate);

	// Rotate cube (Change values to change speed)
	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;
	
	//cube.rotation.z = alpha/10;
	//cube.rotation.x = -beta/10;
	//cube.rotation.y = -gamma/10;
	
	camera.rotation.x = beta0 + beta/20;
	camera.rotation.y = gamma/20;

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
