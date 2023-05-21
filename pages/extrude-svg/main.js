import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

const container = document.getElementById("three");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

let mesh;
let shapes = [];
const svgMarkup = `<svg pointer-events="none" 
width="230" height="230"
viewBox="0 0 252 251" fill="none">
<path pointer-events="all" stroke="black"
  stroke-miter-limit="10" stroke-width="1px"
  d="M241.296
11V145.167C188.641 145.167 145.999 187.267 
145.999 239.254H10C10 113.273
113.588 11 241.296 11Z"
  fill="gold"/>
</svg>`;

const loader = new SVGLoader();
const svgData = loader.parse(svgMarkup);

const material = new THREE.MeshBasicMaterial({
  color: 0xffff00, wireframe: true
});

svgData.paths.forEach((path, i) => {
  shapes = path.toShapes(true);
});

shapes.forEach((shape, i) => {
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 50,
    bevelEnabled: false,
  });
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  scene.add(mesh);
});

camera.position.setZ(600);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  mesh.rotateX(0.005);
  mesh.rotateY(0.005);
  mesh.rotateZ(0.005);

  renderer.render(scene, camera);
}

animate();


