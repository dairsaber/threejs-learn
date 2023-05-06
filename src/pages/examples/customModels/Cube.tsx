import { defineComponent } from "vue"
import * as THREE from "three"
import ThreeContainer, { RenderFunc } from "@/components/ThreeContainer"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { createAnimationController, loadGltf } from "@/utils/model/glfHelper"
const modelPath = "/models/cube.glb"

/**gsap 动画 */
export default defineComponent(() => {
  const renderHandler: RenderFunc = async ({ clock, renderer, scene, camera }) => {
    const axesHelper = new THREE.AxesHelper(5)
    const controller = new OrbitControls(camera, renderer.domElement)
    controller.enableDamping = true // 开启控制器拖动阻尼
    scene.add(axesHelper)

    // 创建聚光
    const spotLight = new THREE.SpotLight(0xffffff, 2, 100, 60, 10)
    spotLight.position.set(-30, -30, 30)
    scene.add(spotLight)

    // 创建环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const model = await loadGltf(modelPath, (event) => {
      console.log("progress :>> ", event.loaded / event.total)
    })
    scene.add(model.scene)

    // 创建动画控制器 并播放gltf自身动画
    const animationController = createAnimationController(model)
    animationController.playAction(0)

    return () => {
      animationController.update(clock.getDelta())
      controller.update()
    }
  }

  return () => <ThreeContainer onRender={renderHandler} />
})
