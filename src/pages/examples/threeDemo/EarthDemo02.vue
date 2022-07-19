<script lang="ts" setup name="EarthDemo">
  import * as THREE from "three"
  import { onMounted, ref } from "vue"
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
  const threeContainer = ref<HTMLDivElement>()
  onMounted(initThree)

  function initThree() {
    // 场景
    const scene = new THREE.Scene()
    //相机
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.01,
      500,
    )

    camera.lookAt(new THREE.Vector3())

    camera.position.set(3, 3, -5)

    // 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    if (threeContainer.value) {
      threeContainer.value?.appendChild(renderer.domElement)
    } else {
      throw new Error("threejs 容器还没有初始化")
    }

    // 创建盒子
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 16)
    // 创建材质loader
    const textureLoader = new THREE.TextureLoader()
    // 加载材质贴图
    const earthTexture = textureLoader.load("imgs/earth.jpg")

    /**
     * MeshBasicMaterial 这种材质不反应灯光
     * 如果要灯管生效 则 现在改成 MeshStandardMaterial
     */

    // 应用材质贴图
    const material = new THREE.MeshStandardMaterial({
      // 反应材质球的光滑程度 决定漫反射程度
      roughness: 1,
      // 金属性
      metalness: 0,
      map: earthTexture,
    })

    const earthMesh = new THREE.Mesh(sphereGeometry, material)
    scene.add(earthMesh)

    const moonTexture = textureLoader.load("imgs/moon.jpg")
    const moonMaterial = new THREE.MeshStandardMaterial({
      // 反应材质球的光滑程度 决定漫反射程度
      roughness: 1,
      // 金属性
      metalness: 0,
      map: moonTexture,
    })

    const moonGroup = new THREE.Group()
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial)
    moonMesh.position.set(1.5, 1, 0)
    moonMesh.scale.setScalar(0.25)

    moonGroup.add(moonMesh)
    scene.add(moonGroup)

    const light = new THREE.PointLight("white", 2)
    light.position.set(2, 2, 2)
    scene.add(light)

    // 添加点光源的helper 主要看灯光在哪?
    scene.add(new THREE.PointLightHelper(light, 0.15))

    // 此外这边还可以添加网格
    scene.add(new THREE.GridHelper(5, 32))

    new OrbitControls(camera, renderer.domElement)

    function render() {
      const time = new Date().getTime() / 1000
      requestAnimationFrame(render)
      earthMesh.rotation.y = time * 0.15
      moonMesh.rotation.y = time * 0.075
      moonGroup.rotation.y = time * 0.5
      renderer.render(scene, camera)
    }

    render()
  }
</script>

<template>
  <div ref="threeContainer"></div>
</template>

<style lang="less" scoped></style>
