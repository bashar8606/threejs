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
const loader = new GLTFLoader();


gsap.registerPlugin(ScrollTrigger);

loader.load(
  "/3d/s9_mini_drone/scene.gltf",
  // "/gltf file _ ref.glb",
  function (gltf) {
    var drone = gltf.scene;
    drone.scale.set(.5, .5, .5);

    drone.position.x = 0; // once rescaled, position the model where needed
    drone.position.y = 3;
    drone.position.z = -10;

    drone.rotation.x = 0.2; // once rescaled, position the model where needed
    drone.rotation.y = 0;
    drone.rotation.z = 0;

    gui.add(gltf.scene.position, "x").min(-100).max(100).step(0.01);
    gui.add(gltf.scene.position, "y").min(-100).max(100).step(0.01);
    gui.add(gltf.scene.position, "z").min(-100).max(100).step(0.01);

    gui.add(gltf.scene.rotation, 'x').min(-100).max(100).step(.01)
    gui.add(gltf.scene.rotation, 'y').min(-100).max(100).step(.01)
    gui.add(gltf.scene.rotation, 'z').min(-100).max(100).step(.01)

    scene.add(drone);

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.defaults({
      immediateRender: false,
      ease: "power1.inOut",
      // scrub: true,
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
      y: -1,
      scrollTrigger: {
        trigger: ".section-two",
        scrub: 1.5,
        endTrigger: ".section-four",
        end: "top bottom",
      },
    });
    drone_anim.to(drone.position, {
      y: 1,
      x: 0,
      z: -10,
      scrollTrigger: {
        trigger: ".section-three",
        scrub: 0.6,
        endTrigger: ".section-four",
        end: "top bottom",
      },
    });
    drone_anim.to(drone.rotation, {
      y: -3,
      x: 1,
      z: 0,
      scrollTrigger: {
        trigger: ".section-four",
        scrub: 0.6,
        endTrigger: ".section-four",
        end: "top bottom",
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


// loader.load(
//     "/3d/city/scene.gltf",
//     function (gltf) {
//       var table = gltf.scene;
//       table.scale.set(.5, .5, .5);
  
//       table.position.x = 0; // once rescaled, position the model where needed
//       table.position.y = 0;
//       table.position.z = 0;
  
//       table.rotation.x = 0; // once rescaled, position the model where needed
//       table.rotation.y = 0;
//       table.rotation.z = 0;
  
      
  
  
//       const tableFolder = gui.addFolder('city position')
//       tableFolder.add(gltf.scene.position, "x").min(-100).max(100).step(0.01);
//       tableFolder.add(gltf.scene.position, "y").min(-100).max(100).step(0.01);
//       tableFolder.add(gltf.scene.position, "z").min(-100).max(100).step(0.01);
//       tableFolder.add(gltf.scene.rotation, "y").min(-100).max(100).step(0.01);


//       scene.add(table);
  
//       let table_anim = gsap.timeline();
  
     
//     },
//     undefined,
//     function (error) {
//       console.error(error);
//     }
//   );


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

// const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
// scene.add(hemiLight)

// const lightSpot = new THREE.SpotLight(0xffa95c,4);
// lightSpot.position.set(-50,50,50);
// lightSpot.castShadow = true;
// scene.add( lightSpot );

const pointLight = new THREE.PointLight(0xff8787, 2, 50);
pointLight.position.set(-3, 5, -5);



// Full Height

gsap.to(pointLight.position, {
  x: 4.36,
  z: -7,
  scrollTrigger: {
    trigger: ".section-two",
    endTrigger: ".section-four",
    start: "top top",
    scrub: 2.5,
    markers: true,
    end: "top bottom",
  },
});



const sphereSize = 0.5;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );


const lightFolder1 = gui.addFolder('point light 1')
lightFolder1.add(pointLight.position, "x").min(-10).max(10).step(0.01);
lightFolder1.add(pointLight.position, "y").min(-10).max(10).step(0.01);
lightFolder1.add(pointLight.position, "z").min(-10).max(10).step(0.01);
lightFolder1.add(pointLight, "intensity").min(-10).max(10).step(0.01);

lightFolder1.open()
scene.add(pointLight);
scene.add( pointLightHelper );

// Lights2

const pointLight2 = new THREE.PointLight(0x3a9ce1, 2, 50);
pointLight2.position.set(4, 2, -4);
pointLight2.intensity = 17;

const sphereSize1 = 0.5;
const pointLightHelper1 = new THREE.PointLightHelper( pointLight2, sphereSize1 );
scene.add(pointLight2);
scene.add( pointLightHelper1 );



const lightFolder2 = gui.addFolder('point light 2')
lightFolder2.add(pointLight2.position, "x").min(-10).max(10).step(0.01);
lightFolder2.add(pointLight2.position, "y").min(-10).max(10).step(0.01);
lightFolder2.add(pointLight2.position, "z").min(-10).max(10).step(0.01);
lightFolder2.add(pointLight2, "intensity").min(-10).max(10).step(0.01);


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
camera.position.y = 3;
camera.position.z = 0;
scene.add(camera);


const cameraPosition = gui.addFolder('camera position')
cameraPosition.add(camera.position, 'x').min(-100).max(100).step(.01)
cameraPosition.add(camera.position, 'y').min(-100).max(100).step(.01)
cameraPosition.add(camera.position, 'z').min(-100).max(100).step(.01)


      
const cameraRotation = gui.addFolder('camera Rotation')
cameraRotation.add(camera.rotation, 'x').min(-100).max(100).step(.01)
cameraRotation.add(camera.rotation, 'y').min(-100).max(100).step(.01)
// cameraRotation.add(camera.rotation, 'z').min(-100).max(100).step(.01)


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
