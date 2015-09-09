var scene;
var camera;
var renderer;
var sphere;
var cube;

function createSpotlight() {
    var spotlight = new THREE.SpotLight(0xffffff);
    spotlight.position.set(-10, 2, 30);
    spotlight.castShadow = true;
    return spotlight;
}

function createAxisHelper() {
    return new THREE.AxisHelper(20);
}

function createCameraLookingAt(position) {
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.x = -10;
    camera.position.y = 0;
    camera.position.z = 30;
    camera.lookAt(position);

    return camera;
}

function createCube(x, y) {
    var geometry = new THREE.BoxGeometry(4, 4, 4);
    var material = new THREE.MeshLambertMaterial({color: 0xff0000});
    var cube = new THREE.Mesh(geometry, material);

    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = -2;
    cube.castShadow = true;

    return cube;
}

function createSphere() {
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    sphere.x = 20;
    sphere.y = 4;
    sphere.z = 2;
    sphere.castShadow = true;

    return sphere;
}

function createRenderer() {
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x444444, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    renderer.domElement.addEventListener('mousedown', onMouseDown);

    return renderer;
}

function onMouseDown(event) {
    var vector = new THREE.Vector3();

    vector.set(
        ( event.clientX / window.innerWidth ) * 2 - 1,
        - ( event.clientY / window.innerHeight ) * 2 + 1,
        0.5 );

    vector.unproject( camera );

    var dir = vector.sub( camera.position ).normalize();

    var distance = - camera.position.z / dir.z;

    var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
    var x = pos.x;
    var y =  pos.y;

    var cube = createCube(x, y);
    scene.add(cube);
}


function renderScene() {
    requestAnimationFrame(renderScene);

    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    cube.rotation.z += 0.02;

    cube.position.z += -1;

    renderer.render(scene, camera);
}

// once everything is loaded, we run our Three.js stuff.
function init() {

    scene = new THREE.Scene();
    camera = createCameraLookingAt(scene.position);
    renderer = createRenderer();
    //sphere = createSphere();
    cube = createCube(-10, 1);

    var spotlight = createSpotlight();
    var axisHelper = createAxisHelper();

    scene.add(camera);
    //scene.add(axisHelper);
    scene.add(spotlight);
    //scene.add(sphere);
    scene.add(cube);

    document.getElementById("WebGL-output")
        .appendChild(renderer.domElement);

    renderScene(renderer, scene, camera);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onResize, false);
window.onload = init;
