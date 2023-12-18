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
    Clock,
    MeshPhongMaterial,
    DirectionalLight,
    TextureLoader,
    AmbientLight,
    HemisphereLight,
    AxesHelper
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

// Axes
const axesHelper = new AxesHelper();
axesHelper.position.x = -1.3;
axesHelper.scale.set(0.1,0.1,0.1);
scene.add(axesHelper);

// Lights
const ambLightSkyColor = 0xb1e1ff ;
const ambLightGroundColor = 0xb97a20;
const ambLightInt = 1;
const hemiLight = new HemisphereLight(ambLightSkyColor, ambLightGroundColor, ambLightInt);
scene.add(hemiLight);

var light01 = new DirectionalLight( 'white' );
light01.position.set( 0, 2, 1);
scene.add(light01);

// A cube geometry, to be used several times
const geometry = new BoxGeometry(0.5, 0.5,0.5);

// A texture loader
const loader = new TextureLoader();

const orangeMaterial = new MeshPhongMaterial({
    color: 'orange',
    specular: 'white',
    shininess: 15,
    flatShading: true,
    map: loader.load("img/EDV CAD512px.png"),
});
const blueMaterial = new MeshPhongMaterial({
    color: 'blue',
    specular: 'white',
    shininess: 15,
    flatShading: true,
    map: loader.load("img/Vertrag512px.png"),
});
const greenMaterial = new MeshPhongMaterial({
    color: 'green',
    specular: 'white',
    shininess: 15,
    flatShading: true,
    map: loader.load("img/Handschühe512px.png"),
});

const orangeCube = new Mesh(geometry, orangeMaterial);
const blueCube = new Mesh(geometry, blueMaterial);
const greenCube = new Mesh(geometry, greenMaterial);

greenCube.position.x += .8;
blueCube.position.x -= .8;

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