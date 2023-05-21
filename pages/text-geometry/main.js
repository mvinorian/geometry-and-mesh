import * as THREE from "three";

import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/fontloader";

// Get Three js Container
const container = document.getElementById("three");

// Create scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.setZ(500);

// Add Hemisphere Light
const light = new THREE.HemisphereLight(0x404040, 0xffffff, 0.5);
scene.add(light);

// Create Text Group and Content
const textGroup = new THREE.Group();
scene.add(textGroup);

const textContent = "Text Geometry";

// Load Font from file
const loader = new FontLoader();
loader.load("fonts/helvetiker_regular.typeface.json", (font) => {
  // Create Geometry from TextGeometry
  const geometry = new TextGeometry(textContent, {
    font: font,
    size: 80,
    height: 5,
    bevelEnabled: true,
    bevelSize: 5,
    bevelThickness: 5,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  // Create Text Mesh
  const material = new THREE.MeshLambertMaterial({ color: 0x00dddd });
  const textObject = new THREE.Mesh(geometry, material);
  textGroup.add(textObject);

  // Calculate Text Bounding Box
  const textGeometry = textObject.geometry;
  textGeometry.computeBoundingBox();

  // Calculate Text Center and change Text Position to center
  const textCenter = new THREE.Vector3();
  textGeometry.boundingBox.getCenter(textCenter);

  textObject.position.setX(-textCenter.x);
});

// Create and add renderer to html
const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Animate rendering and rotation
function animate() {
  requestAnimationFrame(animate);

  textGroup.rotateY(0.01);

  renderer.render(scene, camera);
}

animate();
