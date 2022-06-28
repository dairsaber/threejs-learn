<script lang="ts" setup name="Loading3DModel">
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader"
import { onMounted, ref } from "vue"
import * as THREE from "three"
const container = ref<HTMLDivElement>()

// eslint-disable-next-line no-undef
let scene: Nullable<THREE.Scene> = null

onMounted(initThree)

async function initThree() {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0xffffff)
  container.value?.appendChild(renderer.domElement)

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0, 5)

  scene = new THREE.Scene()

  function animate() {
    requestAnimationFrame(animate)

    renderer.render(scene!, camera)
  }
  animate()
}

const isLoad = ref(false)
/** 加载模型 */
async function loadModel() {
  try {
    if (scene === null || isLoad.value) return
    isLoad.value = true

    const gltfModel = await loadGltf("/models/Cesium_Air.glb", (event) => {
      console.log("progress :>> ", event.loaded / event.total)
    })
    gltfModel.scene.position.set(0, 0, -50)
    gltfModel.scene.rotation.set(45, 45, 45)
    scene.add(gltfModel.scene)
    animate(gltfModel)
  } catch (error) {
    console.error("error :>> ", error)
  }

  function animate(model: GLTF) {
    requestAnimationFrame(() => animate(model))
    model.scene.rotation.x += 0.01
    model.scene.rotation.y += 0.01
    model.scene.rotation.z += 0.01
  }
}

type TypeOfClassMethod<T, M extends keyof T> = T[M] extends Function
  ? T[M]
  : never

async function loadGltf(
  path: string,
  onProgress?: Parameters<TypeOfClassMethod<GLTFLoader, "load">>[2]
): Promise<GLTF> {
  const gltfLoader = new GLTFLoader()

  return new Promise((r, rj) => {
    gltfLoader.load(path, r, onProgress, rj)
  })
}
</script>

<template>
  <div>
    <div ref="container"></div>
    <div class="absolute top-0 left-0">
      <button class="mt-14" @click="loadModel">加载模型</button>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
