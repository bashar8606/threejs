import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as dat from "dat.gui";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";
//texture

// const textureLoader = new THREE.TextureLoader()

// const normalTexture = textureLoader.load('/normalMap.jpg')
// Debug
const gui = new dat.GUI();



//gltf model
const loader = new GLTFLoader();

loader.load(
  "/3d/s9_mini_drone/scene.gltf",
  function (gltf) {
    var drone = gltf.scene;
    drone.scale.set(0.35, 0.35, 0.35);

    drone.position.x = 33; // once rescaled, position the model where needed
    drone.position.y = 16;
    drone.position.z = -40;

    drone.rotation.x = 0.62; // once rescaled, position the model where needed
    drone.rotation.y = -1;
    drone.rotation.z = 0.22;

    gui.add(gltf.scene.position, "x").min(-100).max(100).step(0.01);
    gui.add(gltf.scene.position, "y").min(-100).max(100).step(0.01);
    gui.add(gltf.scene.position, "z").min(-100).max(100).step(0.01);

    // gui.add(gltf.scene.rotation, 'x').min(-100).max(100).step(.01)
    // gui.add(gltf.scene.rotation, 'y').min(-100).max(100).step(.01)
    // gui.add(gltf.scene.rotation, 'z').min(-100).max(100).step(.01)

    scene.add(drone);

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    ScrollTrigger.defaults({
      immediateRender: false,
      ease: "power1.inOut",
      scrub: true,
    });

    let drone_anim = gsap.timeline();

    // Full Height

    drone_anim.to(drone.position, {
      y: 2.4,
      x: 4.36,
      z: -7,
      scrollTrigger: {
        trigger: ".section-two",
        scrub: 0.6,
        endTrigger: ".section-four",
        end: "top bottom",
      },
    });
    drone_anim.to(drone.rotation, {
      y: 2.4,
      scrollTrigger: {
        trigger: ".section-two",
        scrub: 0.9,
        endTrigger: ".section-four",
        end: "top bottom",
      },
    });

    // Slide 2

    drone_anim.to(camera.position, {
      x: -0.1,
      scrollTrigger: {
        trigger: ".section-two",

        start: "top bottom",
        end: "top top",
      },
    });

    // Slide 3

    //  drone_anim.to(scene.rotation, { z: 1.6, scrollTrigger: {

    //      trigger: ".section-three",

    //      start: "top bottom",
    //      end: "top top",

    // }})

    // // Slide 4 - The problem child

    //  drone_anim.to(scene.rotation, { z: 0.02, y: 3.1, scrollTrigger: {

    //      trigger: ".section-four",

    //      start: "top bottom",
    //      end: "top top",

    // }})

    //  drone_anim.to(camera.position, { x: 0.16, scrollTrigger: {

    //      trigger: ".section-four",

    //      start: "top top",
    //      end: "bottom top",

    // }})
  },
  undefined,
  function (error) {
    console.error(error);
  }
);



// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
// const geometry = new THREE.SphereBufferGeometry( .5, 64, 64 );

// Materials

// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0.7
// material.roughness = 0.2
// material.color = new THREE.Color(0x2f98ff)
// material.normalMap = normalTexture

// Mesh
// const sphere = new THREE.Mesh(geometry,material)
// scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.set(10, 10, 3);
pointLight.intensity = 7;

gui.add(pointLight.position, "y").min(-10).max(10).step(0.01);
gui.add(pointLight.position, "x").min(-10).max(10).step(0.01);
gui.add(pointLight.position, "z").min(-10).max(10).step(0.01);
gui.add(pointLight, "intensity").min(-10).max(10).step(0.01);
scene.add(pointLight);

// Lights2

const pointLight2 = new THREE.PointLight(0xffffff, 2);
pointLight2.position.set(-2, 3, 1);
pointLight2.intensity = 17;
scene.add(pointLight2);

gui.add(pointLight2.position, "y").min(-10).max(10).step(0.01);
gui.add(pointLight2.position, "x").min(-10).max(10).step(0.01);
gui.add(pointLight2.position, "z").min(-10).max(10).step(0.01);
gui.add(pointLight2, "intensity").min(0).max(20).step(0.01);

// const materialGui = gui.addFolder('material color')

// const sphereColor = {
//     color : 0xffffff
// }

// materialGui.addColor(sphereColor, 'color')
// .onChange(() => {
// material.color.set(sphereColor.color)
// })
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
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
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
  // sphere.rotation.y = .5 * elapsedTime

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
