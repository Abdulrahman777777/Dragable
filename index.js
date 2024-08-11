import * as THREE from "three";
import { OrbitControls } from "./orbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

//*Camera
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

//*SCENE
const scene = new THREE.Scene();

// //*Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.update();

//*geometry
const geometry = new THREE.IcosahedronGeometry(0.7, 2);
const mat = new THREE.MeshStandardMaterial({
  color: "0xffffff",
  flatShading: true,
});
const mesh = new THREE.Mesh(geometry, mat);
scene.add(mesh);

//*Light'
let fGrad = 0x0d2043;
let sGrad = 0xff0000;
const hemiLight = new THREE.HemisphereLight(sGrad, fGrad);
scene.add(hemiLight);

//*Wire
const wireMat = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: 0xffffff,
});
const wireMesh = new THREE.Mesh(geometry, wireMat);
wireMesh.scale.setScalar(1.2);
mesh.add(wireMesh);
//*Rendering Func
const animate = (t) => {
  requestAnimationFrame(animate);
  mesh.rotation.y = t * 0.0001;
  renderer.render(scene, camera);
};

animate(0);
