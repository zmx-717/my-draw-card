<template>
    <div class="container">
      <!-- Three.js 瓷器模型 -->
      <div class="three-container" ref="threeContainer"></div>
  
      <!-- 打字动画 -->
      <div class="text-container">
        <span ref="typewriter1" class="head"></span>
        <span ref="typewriter2" class="subhead"></span>
      </div>
    </div>
    
  </template>
  
  <script setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
  import Typewriter from 'typewriter-effect/dist/core';
  import { useRouter } from 'vue-router';
  
  const threeContainer = ref(null);
  const typewriter1 = ref(null);
  const typewriter2 = ref(null);
  const router = useRouter();
  
  // let isScrolling = false;
  
  // const handleScroll = (event) => {
  //   if (event.deltaY < 0 && !isScrolling) {
  //     isScrolling = true;
  //     router.push('/home');
  //     setTimeout(() => {
  //       isScrolling = false;
  //     }, 1000); // 防止1秒内多次触发
  //   }
  // };
  
  onMounted(() => {
    // 初始化 Three.js 场景
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth * 0.4 / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth * 0.4, window.innerHeight);
    threeContainer.value.appendChild(renderer.domElement);
  
    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
  
    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
  
    // 加载瓷器模型
    const loader = new GLTFLoader();
    loader.load('/models/ceramic_model.glb', (gltf) => {
      const ceramic = gltf.scene;
      ceramic.scale.set(2.5, 2.5, 2.5);
      ceramic.position.set(0, -1, 0);
      scene.add(ceramic);
  
      // 自动旋转逻辑
      let isUserInteracting = false;
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = true;
      controls.enablePan = false;
  
      controls.addEventListener('start', () => {
        isUserInteracting = true;
      });
  
      controls.addEventListener('end', () => {
        isUserInteracting = false;
      });
  
      const animate = () => {
        requestAnimationFrame(animate);
  
        if (!isUserInteracting) {
          ceramic.rotation.y += 0.01;
        }
  
        controls.update();
        renderer.render(scene, camera);
      };
  
      animate();
    });
  
    // 设置相机位置
    camera.position.z = 3;
  
    // 初始化主标题打字动画
    new Typewriter(typewriter1.value, {
      loop: false,
      delay: 75,
    })
      .typeString('千年窑火，瓷韵新生')
      .pauseFor(1000)
      .start();
  
    // 初始化子标题打字动画
    new Typewriter(typewriter2.value, {
      loop: true,
      delay: 75,
    })
      .typeString('欢迎进入瓷器世界')
      .pauseFor(2000)
      .deleteAll()
      .start();
  
    // 监听窗口大小变化
    const onWindowResize = () => {
      camera.aspect = window.innerWidth * 0.4 / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth * 0.4, window.innerHeight);
    };
  
    window.addEventListener('resize', onWindowResize);
  
    onUnmounted(() => {
      window.removeEventListener('resize', onWindowResize);
    });
  });
  </script>
  
  <style scoped>
  .container {
    margin-top: 8vh;
    display: flex;
    flex-direction: row;
    height: 92vh;
    overflow: hidden;
    background-image: url('/textures/stars_background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.9; 
  }
  
  .three-container {
    flex: 2;
    background-color: transparent;
  }
  
  .text-container {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    font-size: 50px;
    font-family: 'Arial', sans-serif;
    color: white;
    background-size: cover;
    background-position: center;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .head {
    font-size: 60px;
    margin-bottom: 20px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6);
  }
  
  .subhead {
    font-size: 24px;
    margin-left: 150px;
    transition: color 0.3s ease;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.6);
  }
  
  
  </style>