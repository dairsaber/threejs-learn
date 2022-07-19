<script lang="ts" setup name="GLSLDemo01">
  import { onMounted, onUnmounted, ref } from "vue"
  import * as THREE from "three"

  import { vshader } from "./demo01.glsl"

  const container = ref<HTMLDivElement>()
  let removeResizeEvent: Undefable<() => void> = undefined

  onMounted(init)
  onUnmounted(() => removeResizeEvent?.())

  function init() {
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)

    const renderer = new THREE.WebGLRenderer({ antialias: false })
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.value?.appendChild(renderer.domElement)

    // 1. 创建plane
    const geometry = new THREE.PlaneGeometry(2, 2)
    // 2. 创建一个默认的shader 材质
    const material = new THREE.ShaderMaterial({
      vertexShader: vshader,
    })
    // 3. 根据材质和几何体创建网格模型
    const plane = new THREE.Mesh(geometry, material)
    // 4. 加入场景
    scene.add(plane)
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

    animate(scene, camera)

    /**动画函数 */
    function animate(scene: THREE.Scene, camera: THREE.Camera) {
      function animateFunc() {
        requestAnimationFrame(animateFunc)
        renderer.render(scene, camera)
      }

      animateFunc()
    }

    function onWindowResize() {
      const aspectRatio = window.innerWidth / window.innerHeight
      let width: number, height: number
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
  }
</script>

<template>
  <div ref="container"></div>
</template>
