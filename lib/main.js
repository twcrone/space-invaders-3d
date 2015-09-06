function addSpotlightTo(scene) {
    var spotlight = new THREE.SpotLight(0xffffff);
    spotlight.position.set(-40, 60, -10);
    scene.add(spotlight);
}

function createRenderer() {
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x444444, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    return renderer;
}

// once everything is loaded, we run our Three.js stuff.
function init() {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);


    var axes = new THREE.AxisHelper(20);
    scene.add(axes);

    addSpotlightTo(scene);

    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    sphere.x = 20;
    sphere.y = 4;
    sphere.z = 2;

    scene.add(sphere);

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    var renderer = createRenderer();

    document.getElementById("WebGL-output")
        .appendChild(renderer.domElement);


    renderer.render(scene, camera);
}
window.onload = init;
