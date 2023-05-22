import * as THREE from 'three';
import { ThreeBSP } from 'three-js-csg';

const container = document.getElementById('three');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

const geometryA = new THREE.BoxGeometry(1, 1, 1);
const materialA = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const meshA = new THREE.Mesh(geometryA, materialA);
scene.add(meshA);

const geometryB = new THREE.SphereGeometry(0.5, 32, 32);
const materialB = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const meshB = new THREE.Mesh(geometryB, materialB);
scene.add(meshB);

camera.position.setZ(5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  // Perform the binary operation (subtract)
  const resultGeometry = performBinaryOperation(geometryA, geometryB);

  // Create a mesh from the result geometry
  const resultMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const resultMesh = new THREE.Mesh(resultGeometry, resultMaterial);
  scene.add(resultMesh);

  renderer.render(scene, camera);
}

function performBinaryOperation(geometryA, geometryB) {
  // Convert geometries to ThreeBSP objects
  const bspA = new ThreeBSP(geometryA);
  const bspB = new ThreeBSP(geometryB);

  // Perform the subtraction operation
  const resultBSP = bspA.substract(bspB);

  // Convert the result back to a Three.js geometry
  const resultGeometry = resultBSP.toMesh();

  return resultGeometry;
}

animate();
