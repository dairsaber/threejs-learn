<script lang="ts" setup name="GLSLDemo01">
  import { onMounted, onUnmounted, ref } from "vue"
  import * as THREE from "three"

  const container = ref<HTMLDivElement>()
  let removeResizeEvent: Undefable<() => void> = undefined

  onMounted(init)
  onUnmounted(() => removeResizeEvent?.())

  function init() {
    const sence = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)

    const renderer = new THREE.WebGLRenderer({ antialias: false })
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.value?.appendChild(renderer.domElement)
    /** TODO */

    // 1. 创建plane
    const geometry = new THREE.PlaneGeometry(2, 2)
    // 2. 创建一个默认的shader 材质
    const material = new THREE.ShaderMaterial()
    // 3. 根据材质和几何体创建网格模型
    const plane = new THREE.Mesh(geometry, material)
    // 4. 加入场景
    sence.add(plane)
    // 5. 把相机向z轴正方向移动一个单位
    camera.position.z = 1

    /** 公共方法 */
    const uniforms = {
      u_color: { value: new THREE.Color(0xff0000) },
      u_time: { value: 0.0 },
      u_mouse: { value: { x: 0.0, y: 0.0 } },
      u_resolution: { value: { x: 0, y: 0 } },
    }

    onWindowResize()

    window.addEventListener("resize", onWindowResize)
    removeResizeEvent = () => window.removeEventListener("resize", onWindowResize)

    animate()

    function onWindowResize() {
      const aspectRatio = window.innerWidth / window.innerHeight
      let width, height
      if (aspectRatio >= 1) {
        width = 1
        height = (window.innerHeight / window.innerWidth) * width
      } else {
        width = aspectRatio
        height = 1
      }
      camera.left = -width
      camera.right = width
      camera.top = height
      camera.bottom = -height
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      uniforms.u_resolution.value.x = window.innerWidth
      uniforms.u_resolution.value.y = window.innerHeight
    }

    function animate() {
      requestAnimationFrame(animate)
      renderer.render(sence, camera)
    }
  }
</script>

<template>
  <div ref="container"></div>
</template>

<style lang="less" scoped></style>
