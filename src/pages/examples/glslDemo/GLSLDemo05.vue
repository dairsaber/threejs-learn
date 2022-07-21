<script lang="ts" setup name="GLSLDemo01">
  import { onMounted, onUnmounted, ref } from "vue"
  import * as THREE from "three"
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
  import { fragmentShader, vertexShader } from "./demo05.glsl"
  const container = ref<HTMLDivElement>()
  let removeResizeEvent: Undefable<() => void> = undefined

  onMounted(init)
  onUnmounted(() => removeResizeEvent?.())

  function init() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    new OrbitControls(camera, renderer.domElement)
    container.value?.appendChild(renderer.domElement)
    /** TODO */

    // 1. 创建plane
    const geometry = new THREE.SphereGeometry(1, 32, 16)
    // 2. 创建一个默认的shader 材质
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color("#f02233") },
      },
      fragmentShader,
      vertexShader,
    })
    // 3. 根据材质和几何体创建网格模型
    const mesh = new THREE.Mesh(geometry, material)
    // 4. 加入场景
    scene.add(mesh)
    // 5. 把相机向z轴正方向移动一个单位
    camera.position.z = 5

    renderer.setClearColor("white")
    removeResizeEvent = () => window.removeEventListener("resize", onWindowResize)

    const clock = new THREE.Clock()
    animate()
    function animate() {
      requestAnimationFrame(animate)
      material.uniforms.time.value = clock.getElapsedTime()
      renderer.render(scene, camera)
    }

    window.addEventListener("resize", onWindowResize)

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      // 更新相机投影矩阵
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
  }
</script>

<template>
  <div ref="container"></div>
</template>

<style lang="less" scoped></style>
