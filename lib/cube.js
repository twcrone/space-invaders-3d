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