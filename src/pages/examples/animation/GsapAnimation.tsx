import { defineComponent, onUnmounted } from "vue"
import * as THREE from "three"
import ThreeContainer, { RenderFunc } from "@/components/ThreeContainer"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap"

/**gsap 动画 */
export default defineComponent(() => {
  const destroyFuncs = [] as (() => void)[]

  onUnmounted(() => {
    destroyFuncs.forEach((func) => func())
  })

  const renderHandler: RenderFunc = ({ renderer, scene, camera }) => {
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
    const axesHelper = new THREE.AxesHelper(5)
    const controller = new OrbitControls(camera, renderer.domElement)
    controller.enableDamping = true // 开启控制器拖动阻尼

    scene.add(boxMesh)
    scene.add(axesHelper)

    // 设置动画
    const positionAnimate = gsap.to(boxMesh.position, {
      x: 5,
      duration: 5,
      ease: "power1.out",
      // 重复次数 -1 为无限
      repeat: -1,
      // 往返
      yoyo: true,
      // 这边还有开始和结束的钩子  看文档吧 太多了
    })
    // 旋转动画
    gsap.to(boxMesh.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.out" })

    // 可以对animate对象操作控制开始和停止
    window.addEventListener("dblclick", animationController)
    // 放入销毁池中 在组件卸载之后销毁
    destroyFuncs.push(() => {
      window.removeEventListener("dblclick", animationController)
    })

    function animationController() {
      if (positionAnimate.isActive()) {
        positionAnimate.pause()
      } else {
        positionAnimate.resume()
      }
    }

    return () => {
      controller.update()
    }
  }

  return () => (
    <div>
      <ThreeContainer onRender={renderHandler} />
      <div class="absolute top-0 left-0 text-white">双击停止/开启动画</div>
    </div>
  )
})
