import * as THREE from "three";

const container = document.getElementById("three");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 ); 
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
const torusKnot = new THREE.Mesh( geometry, material ); scene.add( torusKnot );

camera.position.setZ(45);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  torusKnot.rotateX(0.01);
  torusKnot.rotateY(0.005);
  torusKnot.rotateZ(0.015);

  renderer.render(scene, camera);
}

animate();
