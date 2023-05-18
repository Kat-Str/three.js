import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

// Group

const cubes = new THREE.Group();
scene.add(cubes);
cubes.scale.y = 2;
cubes.rotation.x = 0.4;

// one way of creating mesh

const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const redCube = new THREE.Mesh(geometry, material);
redCube.position.x = 0;
cubes.add(redCube);

// another way of creating mesh

const greenCube = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 0.5),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
greenCube.position.x = -1;
cubes.add(greenCube);

const blueCube = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 0.5),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
blueCube.position.x = 1;
cubes.add(blueCube);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// "Look at" method
camera.lookAt(cubes.position);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
