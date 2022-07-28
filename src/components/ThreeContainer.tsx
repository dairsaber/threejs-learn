import { defineComponent, onMounted, onUnmounted, PropType, ref } from "vue"
import * as THREE from "three"

export type RenderFunc = (params: {
  clock: THREE.Clock
  scene: THREE.Scene
  camera: THREE.Camera
  renderer: THREE.WebGLRenderer
}) => AnimateFunc | void

export type AnimateFunc = (time: number) => void

export default defineComponent({
  props: {
    onRender: { type: Function as PropType<RenderFunc>, required: false, default: undefined },
  },
  setup(props) {
    const containerRef = ref<HTMLDivElement>()
    let removeResizeEvent: Undefable<() => void> = undefined
    let unmounted = false
    onMounted(init)
    onUnmounted(() => {
      removeResizeEvent?.()
      unmounted = true
    })

    function init() {
      const containerEle = containerRef.value!

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      )
      camera.position.z = 5
      scene.add(camera)

      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)
      containerEle.appendChild(renderer.domElement)
      removeResizeEvent = () => window.removeEventListener("resize", onWindowResize)

      const clock = new THREE.Clock(true)

      const onAnimate = props.onRender?.({ clock, scene, camera, renderer })

      function animate(time: number) {
        if (unmounted) return
        onAnimate?.(time)
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
      }

      requestAnimationFrame(animate)

      window.addEventListener("resize", onWindowResize)

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        // 更新相机投影矩阵
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
    }

    return () => <div ref={containerRef}></div>
  },
})
