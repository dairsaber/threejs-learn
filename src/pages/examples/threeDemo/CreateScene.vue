<script lang="ts" setup name="CreateScene">
import * as THREE from "three"
import { onMounted, ref } from "vue"
const threeContainer = ref<HTMLDivElement>()
onMounted(initThree)

function initThree() {
  // 场景
  const scene = new THREE.Scene()
  //相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  // 渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  if (threeContainer.value) {
    threeContainer.value?.appendChild(renderer.domElement)
  } else {
    throw new Error("threejs 容器还没有初始化")
  }

  // 创建盒子
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(boxGeometry, material)

  scene.add(cube)

  camera.position.z = 5

  function animate() {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    renderer.render(scene, camera)
  }

  animate()
}
</script>

<template>
  <div ref="threeContainer"></div>
</template>

<style lang="less" scoped></style>
