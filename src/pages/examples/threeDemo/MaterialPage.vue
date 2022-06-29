<script lang="ts" setup name="MaterialPage">
import * as THREE from "three"
import { onMounted, ref, watch } from "vue"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
const threeContainer = ref<HTMLDivElement>()
onMounted(initThree)

const cubeRef = ref<THREE.Mesh<THREE.BoxGeometry, THREE.Material>>()

/**
 * MeshBasicMaterial	基础网格材质，不受光照影响的材质
 * MeshLambertMaterial	Lambert网格材质，与光照有反应，漫反射
 * MeshPhongMaterial	高光Phong材质,与光照有反应
 * MeshStandardMaterial	PBR物理材质，相比较高光Phong材质可以更好的模拟金属、玻璃等效果
 */

type MaterialPropertiesItem = {
  material: THREE.Material
  label: string
}

const materialProperties: MaterialPropertiesItem[] = [
  {
    label: "兰伯特红色透明度.5",
    material: new THREE.MeshLambertMaterial({
      color: 0xff0000,
      opacity: 0.5,
      transparent: true,
    }),
  },
  {
    label: "添加高光效果",
    material: new THREE.MeshPhongMaterial({
      color: 0x0000ff,
      // 反射光颜色
      specular: 0xff0000,
      //光泽度；反射；亮度
      shininess: 10,
    }),
  },
]

const selectedMaterail = ref<string>("请选择材质")
watch(selectedMaterail, (val) => {
  if (val && cubeRef.value) {
    const targetMaterial = materialProperties.find((x) => x.label === val)

    if (targetMaterial) {
      cubeRef.value.material = targetMaterial.material
    }
  }
})

function handleChange(evt: any) {
  selectedMaterail.value = evt.target.value
}

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

  //创建背景盒子
  const boxBgGeometry = new THREE.BoxGeometry(20, 20, 20)
  const bgMaterial = new THREE.MeshLambertMaterial({ color: 0x330f0f })
  const bgCube = new THREE.Mesh(boxBgGeometry, bgMaterial)
  bgCube.position.set(-10, -10, -22)
  scene.add(bgCube)
  // 创建材质盒子
  const boxGeometry = new THREE.BoxGeometry(20, 20, 20)
  const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(boxGeometry, material)
  cube.position.set(0, 0, 0)
  scene.add(cube)
  // 存一下cube
  cubeRef.value = cube

  // 创建聚光
  const spotLight = new THREE.SpotLight(0xffffff, 2, 100, 60, 10)
  spotLight.position.set(-30, -30, 30)
  scene.add(spotLight)

  // 创建环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  camera.position.set(50, 50, 50)

  // 新建控制器
  new OrbitControls(camera, renderer.domElement)

  function render() {
    requestAnimationFrame(render)

    renderer.render(scene, camera)
  }

  render()
}
</script>

<template>
  <div>
    <div ref="threeContainer"></div>
    <div class="absolute bottom-0 left-0">
      <select @change="handleChange">
        <option disabled selected value>请选择材质</option>
        <option
          v-for="item in materialProperties"
          :key="item.label"
          :value="item.label"
        >
          {{ item.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
