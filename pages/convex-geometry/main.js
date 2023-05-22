import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';

let group, camera, scene, renderer;

init();
animate();

function init() {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // camera
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(15, 20, 30);
  scene.add(camera);

  // controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 20;
  controls.maxDistance = 50;
  controls.maxPolarAngle = Math.PI / 2;

  // point light
  const light = new THREE.PointLight(0xffffff, 1);
  camera.add(light);

  // helper
  scene.add(new THREE.AxesHelper(20));

  // textures
  const loader = new THREE.TextureLoader();
  const texture = loader.load('textures/sprites/disc.png');
  texture.colorSpace = THREE.SRGBColorSpace;

  group = new THREE.Group();
  scene.add(group);

  // points

  const vertices = [];
  for (let i = 0; i < 10; i++) {
    var randomX = Math.round(Math.random() * 5);
    var randomY = Math.round(Math.random() * 4);
    var randomZ = Math.round(Math.random() * 4);
    vertices.push(new THREE.Vector3(randomX, randomY, randomZ));
  }

  const pointsMaterial = new THREE.PointsMaterial({
    color: 0x0080ff,
    map: texture,
    size: 1,
    alphaTest: 0.5,
  });

  const pointsGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
  const points = new THREE.Points(pointsGeometry, pointsMaterial);
  group.add(points);

  const meshMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    opacity: 0.5,
    side: THREE.DoubleSide,
    transparent: true,
  });

  const meshGeometry = new ConvexGeometry(vertices);
  const mesh = new THREE.Mesh(meshGeometry, meshMaterial);
  group.add(mesh);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  // group.rotation.y += 0.05;
  renderer.render(scene, camera);
}
