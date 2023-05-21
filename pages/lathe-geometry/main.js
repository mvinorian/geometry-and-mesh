import * as THREE from "three";

const container = document.getElementById("three");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

const points = [];
for (let i = 0; i < 10; i++) {
  points.push(new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
  console.log(points[i]);
}
const geometry = new THREE.LatheGeometry(points, 20, 0, 2 * Math.PI);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
const lathe = new THREE.Mesh(geometry, material);
scene.add(lathe);

camera.position.setZ(40);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  lathe.rotateX(0.005);
  lathe.rotateY(0.005);
  lathe.rotateZ(0.005);

  renderer.render(scene, camera);
}

animate();
