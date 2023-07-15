import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Textures
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

const matcapTexture = textureLoader.load("/textures/matcaps/3.png");
const gradientTexture = textureLoader.load("/textures/gradients/5.jpg");

// Environment map

const cubeTextureLoader = new THREE.CubeTextureLoader();

const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.jpg",
  "/textures/environmentMaps/0/nx.jpg",
  "/textures/environmentMaps/0/py.jpg",
  "/textures/environmentMaps/0/ny.jpg",
  "/textures/environmentMaps/0/pz.jpg",
  "/textures/environmentMaps/0/nz.jpg",
]);

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Objects

/**
 * Materials
 */

// MeshBasicMaterial

const basicMaterial = new THREE.MeshBasicMaterial();
basicMaterial.color = new THREE.Color("pink");
basicMaterial.wireframe = true;
basicMaterial.transparent = true;
basicMaterial.opacity = 0.5;
basicMaterial.alphaMap = doorAlphaTexture;
basicMaterial.side = THREE.DoubleSide;

// MeshNormalMaterial

const normalMaterial = new THREE.MeshNormalMaterial();
normalMaterial.flatShading = true;

//MeshMatcapMaterial

const matcapMaterial = new THREE.MeshMatcapMaterial();
matcapMaterial.matcap = matcapTexture;

// MeshDepthMaterial

const depthMaterial = new THREE.MeshDepthMaterial();

// MeshLambertMaterial

const lambertMaterial = new THREE.MeshLambertMaterial();
lambertMaterial.color = new THREE.Color("indigo");
lambertMaterial.envMap = environmentMapTexture;

// MeshPhongMaterial

const phongMaterial = new THREE.MeshPhongMaterial();
phongMaterial.shininess = 100;
phongMaterial.specular = new THREE.Color(0x1188ff);
phongMaterial.envMap = environmentMapTexture;

// MeshToonMaterial

const toonMaterial = new THREE.MeshToonMaterial();
toonMaterial.gradientMap = gradientTexture;
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

// MeshStandardMaterial

const standardMaterial = new THREE.MeshStandardMaterial();
standardMaterial.map = doorColorTexture;
standardMaterial.aoMap = doorAmbientOcclusionTexture;
standardMaterial.aoMapIntensity = 10;
standardMaterial.metalnessMap = doorMetalnessTexture;
standardMaterial.roughnessMap = doorRoughnessTexture;
standardMaterial.normalMap = doorNormalTexture;

// Geometries

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  basicMaterial
);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), matcapMaterial);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.1, 16, 32),
  normalMaterial
);
torus.position.x = 1.5;

const capsule = new THREE.Mesh(
  new THREE.CapsuleGeometry(0.3, 0.3, 2, 5),
  depthMaterial
);
capsule.position.y = 1.5;

const knot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.2, 0.1, 64, 12),
  lambertMaterial
);
knot.position.x = 1.5;
knot.position.y = 1.5;

const torusTwo = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.1, 16, 32),
  phongMaterial
);
torusTwo.position.x = -1.5;
torusTwo.position.y = 1.5;

const ball = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  toonMaterial
);
ball.position.x = 1.5;
ball.position.y = -1.5;

const door = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), standardMaterial);
door.position.x = -1.5;
door.position.y = -1.5;

const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), phongMaterial);
box.position.y = -1.5;

scene.add(sphere, plane, torus, capsule, knot, torusTwo, ball, door, box);

/**
 * Sizes
 */
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.3 * elapsedTime;
  torus.rotation.y = 0.3 * elapsedTime;
  plane.rotation.y = 0.3 * elapsedTime;

  sphere.rotation.x = 0.3 * elapsedTime;
  torus.rotation.x = 0.3 * elapsedTime;
  plane.rotation.x = 0.3 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
