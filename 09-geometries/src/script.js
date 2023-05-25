import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#ffc8dd");

// Object

const triangle = new THREE.BufferGeometry();
const secondMaterial = new THREE.MeshBasicMaterial({
  color: "#2a9d8f",
  wireframe: true,
});
const secondMesh = new THREE.Mesh(triangle, secondMaterial);
const positionsArrayTwo = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
const indicesArray = new Uint32Array([0, 1, 2]);
const positionsAttributeTwo = new THREE.BufferAttribute(positionsArrayTwo, 3);
const indicesAttribute = new THREE.BufferAttribute(indicesArray, 1);
triangle.setAttribute("position", positionsAttributeTwo);
triangle.setIndex(indicesAttribute);
secondMesh.position.x = 4;
scene.add(secondMesh);

// Testing
const geometry = new THREE.BufferGeometry();
const count = 500;
const positionsArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4;
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute("position", positionsAttribute);

const material = new THREE.MeshBasicMaterial({ color: "#2a9d8f" });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 8;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
