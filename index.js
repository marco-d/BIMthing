import {
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    MOUSE,
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
    MathUtils,
    Clock
} from 'three';

import CameraControls from 'camera-controls';

const subsetOfTHREE = {
    MOUSE,
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
    MathUtils: {
        DEG2RAD : MathUtils.DEG2RAD,
        clamp: MathUtils.clamp
    }
};

import { 
    OrbitControls 
} from "three/examples/jsm/controls/OrbitControls.js";



//the scene!
const scene = new Scene() ;

const geometry = new BoxGeometry(0.5, 0.5,0.5);
const orangeMaterial = new MeshBasicMaterial({color: 'orange'});
const blueMaterial = new MeshBasicMaterial({color: 'blue'});
const greenMaterial = new MeshBasicMaterial({color: 'green'});

const orangeCube = new Mesh(geometry, orangeMaterial);
const blueCube = new Mesh(geometry, blueMaterial);
const greenCube = new Mesh(geometry, greenMaterial);

greenCube.position.x += 1;
blueCube.position.x -= 1;

scene.add(orangeCube);
scene.add(blueCube);
scene.add(greenCube);




const canvas = document.getElementById('three-canvas');

const camera = new PerspectiveCamera(75, canvas.clientWidth/canvas.clientHeight);
camera.position.z = 1.5;
scene.add(camera);

CameraControls.install( { THREE: subsetOfTHREE });
const clock = new Clock();
const camctrl = new CameraControls(camera, canvas);

const renderer = new WebGLRenderer({canvas: canvas,});
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

function letsFloat (floatingObject) {
    floatingObject.rotation.x += 0.005;
    floatingObject.rotation.y += 0.009;
    floatingObject.rotation.z -= 0.01;
}

function animate() {
    const delta = clock.getDelta();
    camctrl.update(delta);
    
    letsFloat(orangeCube);
    letsFloat(blueCube);
    letsFloat(greenCube);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
});