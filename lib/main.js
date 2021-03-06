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

function createCameraLookingAt(position) {
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.x = -10;
    camera.position.y = 0;
    camera.position.z = 30;
    camera.lookAt(position);

    return camera;
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
    var pos = Util.getPositionFromMouseEvent(event);
    var cube = Cube.create({x: pos.x, y: pos.y});
    scene.add(cube);
}


function renderScene() {
    scene.traverse(function(obj) {
       if(obj instanceof THREE.Mesh) {
           obj.rotation.x += 0.02;
           obj.rotation.y += 0.02;
           obj.rotation.z += 0.02;
           obj.position.z += -1;
       }
    });

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
}

var cubes = [];

// once everything is loaded, we run our Three.js stuff.
function init() {

    scene = new THREE.Scene();
    camera = createCameraLookingAt(scene.position);
    renderer = createRenderer();
    var spotlight = createSpotlight();

    scene.add(camera);
    scene.add(spotlight);

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
