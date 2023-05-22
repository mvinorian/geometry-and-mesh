import * as THREE from "three";

const container = document.getElementById("three");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

const geometry = new THREE.BufferGeometry();
const positions = [];
const normals = [];
const indices = [];

const segments = 100; // Number of segments along the U and V directions

for (let u = 0; u < segments; u++) {
  for (let v = 0; v < segments; v++) {
    const theta = u / segments * Math.PI * 2; // Angle around the tube
    const phi = v / segments * Math.PI * 2; // Twist along the tube

    // Parametric equations for torus knot
    const radius = 0.5;
    const tubeRadius = 0.2;
    const x = (radius + tubeRadius * Math.cos(phi)) * Math.cos(theta);
    const y = (radius + tubeRadius * Math.cos(phi)) * Math.sin(theta);
    const z = tubeRadius * Math.sin(phi);

    positions.push(x, y, z);

    // Normals
    const normal = new THREE.Vector3(x, y, z).normalize();
    normals.push(normal.x, normal.y, normal.z);

    // Indices
    const i = u * segments + v;
    const j = (u + 1) % segments * segments + v;
    const k = u * segments + (v + 1) % segments;
    const l = (u + 1) % segments * segments + (v + 1) % segments;
    indices.push(i, j, k);
    indices.push(j, l, k);
  }
}

geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
geometry.setIndex(indices);

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

camera.position.set(0, 0, 2);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.005;
  mesh.rotation.z += 0.015;

  renderer.render(scene, camera);
}

animate();
