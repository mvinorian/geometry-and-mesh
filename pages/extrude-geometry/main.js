import * as THREE from "three";

const container = document.getElementById("three");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.setZ(5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  cube.rotateX(0.01);
  cube.rotateY(0.005);
  cube.rotateZ(0.015);

  renderer.render(scene, camera);
}

animate();
