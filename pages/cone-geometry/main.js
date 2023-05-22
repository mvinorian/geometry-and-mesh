import * as THREE from "three";

const container = document.getElementById("three");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

const geometry = new THREE.ConeGeometry( 5, 20, 32 ); 
const material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true} );
const cone = new THREE.Mesh(geometry, material ); scene.add( cone );

camera.position.setZ(35);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  cone.rotateX(0.01);
  cone.rotateY(0.005);
  cone.rotateZ(0.015);

  renderer.render(scene, camera);
}

animate();
