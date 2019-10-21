let camera, scene, renderer, cube, material;

const height = window.innerHeight;
const width = window.innerWidth;

//unit = 1;

if (height <= width) {
	unit = height/300;
} else {
	unit = width/300;
};


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

	// Create material with color
	// material = new THREE.MeshBasicMaterial({ color: "hsl(360, 100%, 50%)" });
	 material = new THREE.MeshNormalMaterial();
	// material = new THREE.MeshToonMaterial({ color: "hsl(360, 100%, 50%)" });
	// const material = new THREE.MeshPhongMaterial({ color: 0x6699FF });
	// material = new THREE.MeshStandardMaterial({ color: "hsl(360, 100%, 50%)" });

	// Add texture - 
	// const texture = new THREE.TextureLoader().load('textures/crate.gif');

	// Create material with texture
	// const material = new THREE.MeshBasicMaterial({ map: texture });

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
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render(scene, camera);
}

function onWindowResize() {
	// Camera frustum aspect ratio
	camera.aspect = window.innerWidth / window.innerHeight;
	// After making changes to aspect
	camera.updateProjectionMatrix();
	// Reset size
    renderer.setSize(window.innerWidth, window.innerHeight);

    //cube.rotation.y = 0.01*(height - window.innerHeight);
    //cube.rotation.x = 0.01*(width - window.innerWidth);

    //material = new THREE.MeshBasicMaterial({ color: "hsl(360, 100%, 100%)" });

    renderer.render(scene, camera);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
