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

    // 应用材质贴图
    const material = new THREE.MeshBasicMaterial({
      map: earthTexture,
    })

    const earthMesh = new THREE.Mesh(sphereGeometry, material)
    scene.add(earthMesh)

    const moonTexture = textureLoader.load("imgs/moon.jpg")
    const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture })

    const moonGroup = new THREE.Group()
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial)
    moonMesh.position.set(1.5, 1, 0)
    moonMesh.scale.setScalar(0.25)

    moonGroup.add(moonMesh)
    scene.add(moonGroup)

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
