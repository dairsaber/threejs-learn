<script lang="ts" setup name="MouseControl">
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
  const boxGeometry = new THREE.BoxGeometry(5, 5, 5)
  const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(boxGeometry, material)
  cube.position.set(10, 15, 0)
  scene.add(cube)

  // 创建点光
  const pointLight = new THREE.PointLight(0xffffff, 1, 100)
  pointLight.position.set(0, 35, 20)
  scene.add(pointLight)

  camera.position.z = 50

  // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
  const axisHelper = new THREE.AxesHelper(250)
  scene.add(axisHelper)

  // 下面当鼠标改变有两种更新视图的方式
  // 第一种是改变一下就通知更新一下视图
  // 第二种 就是采用游戏的模式 它是由刷新率的

  // 新建控制器
  const controllers = new OrbitControls(camera, renderer.domElement)
  // 方法一
  // function render() {
  //   renderer.render(scene, camera)
  // }
  // controllers.addEventListener("change", render)

  // 方法二 直接让场景跑起来
  console.log("controllers :>> ", controllers) // 这边不需要监听任何事件
  function render() {
    requestAnimationFrame(render)

    renderer.render(scene, camera)
  }

  render()
}
</script>

<template>
  <div ref="threeContainer"></div>
</template>

<style lang="less" scoped></style>
