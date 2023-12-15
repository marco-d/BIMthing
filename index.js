import {
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from 'three';

//the scene!
const scene = new Scene() ;

const geometry = new BoxGeometry(0.5, 0.5,0.5);
const material = new MeshBasicMaterial({color: 'orange'});
const cubeMesh = new Mesh(geometry, material);
scene.add(cubeMesh);

const sizes = {
    width: 800,
    height: 600,
};

const camera = new PerspectiveCamera(75, sizes.width/sizes.height);
scene.add(camera);

const canvas = document.getElementById('three-canvas');
const renderer = new WebGLRenderer({
    canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);