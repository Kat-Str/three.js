import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "#ff477e" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const secondCube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "#ee9b00" })
);
secondCube.position.x = 2;
scene.add(secondCube);

const GSAPCube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "#84f3a1" })
);
GSAPCube.position.x = 5;
scene.add(GSAPCube);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Time
let time = Date.now();

// Animations
const tick = () => {
  // time
  let currentTime = Date.now();
  let deltaTime = currentTime - time;
  time = currentTime;

  // update the objects
  mesh.rotation.y += 0.002 * deltaTime;

  // render
  renderer.render(scene, camera);

  // call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// Clock

const clock = new THREE.Clock();

const secondCubeTick = () => {
  const elapsedTime = clock.getElapsedTime();

  camera.position.y = Math.sin(elapsedTime);
  camera.lookAt(secondCube.position);

  renderer.render(scene, camera);

  window.requestAnimationFrame(secondCubeTick);
};

secondCubeTick();

// GSAP library

const tween = () => {
  gsap.to(GSAPCube.position, {
    duration: 2,
    delay: 0,
    z: 2,
  });

  gsap.to(GSAPCube.position, { duration: 3, delay: 5, z: 0 });
  renderer.render(scene, camera);
};
tween();
