import { defineComponent, onMounted, onUnmounted, PropType, Ref, ref } from "vue"
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
    const cancelToken = ref(false)
    let removeResizeEvent: Undefable<() => void>

    onMounted(init)
    onUnmounted(destroy)

    // 初始化
    function init() {
      const scene = new THREE.Scene()
      const camera = createCamera(scene)
      const renderer = initRenderer(containerRef.value!)
      const clock = new THREE.Clock()
      const onAnimate = props.onRender?.({ clock, scene, camera, renderer })

      removeResizeEvent = registerResizeEvent(camera, renderer)

      startPlay(scene, camera, renderer, onAnimate, cancelToken)
    }

    // 销毁
    function destroy() {
      removeResizeEvent?.()
      cancelToken.value = true
    }

    return () => <div ref={containerRef}></div>
  },
})

/** 公共函数  */
function createCamera(scene: THREE.Scene) {
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5
  scene.add(camera)

  return camera
}

function initRenderer(containerEle: HTMLDivElement) {
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  containerEle.appendChild(renderer.domElement)

  return renderer
}

function startPlay(
  scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer,
  callback?: Function,
  cancelToken?: Ref<boolean>,
) {
  requestAnimationFrame(animate)

  function animate(time: number) {
    if (cancelToken?.value ?? false) return
    callback?.(time)
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
}

function registerResizeEvent(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
  window.addEventListener("resize", onWindowResize)

  return () => window.removeEventListener("resize", onWindowResize)

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    // 更新相机投影矩阵
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
  }
}
