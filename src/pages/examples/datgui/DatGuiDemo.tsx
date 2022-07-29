import { defineComponent, onUnmounted } from "vue"
import * as THREE from "three"
import ThreeContainer, { RenderFunc } from "@/components/ThreeContainer"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GUI } from "dat.gui"
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

    // 为boxMesh添加gui控制

    const gui = new GUI({ name: "我的gui" })
    gui.domElement.style.marginRight = "300px"
    gui.domElement.style.marginTop = "20px"
    destroyFuncs.push(() => gui.destroy())

    gui
      .add(boxMesh.position, "x")
      .min(0)
      .max(5)
      .step(0.01)
      .name("x轴")
      .onChange((val) => console.log("x移动了", val))
      .onFinishChange((val) => console.log("移动结果", val))

    let animation: gsap.core.Tween
    const params = {
      color: "#ffff00",
      fn: () => {
        if (animation) {
          if (animation.isActive()) {
            animation.pause()
            changeName("启动动画")
          } else {
            animation.resume()
            changeName("停止动画")
          }
          return
        }
        animation = gsap.to(boxMesh.position, {
          x: 5,
          repeat: -1,
          yoyo: true,
          duration: 5,
          ease: "power1",
        })
        changeName("停止动画")
      },
    }

    // 设置显示与否
    gui.add(boxMesh, "visible").name("是否显示")

    // 点击触发事件
    const animateController = gui.add(params, "fn").name("开启动画")
    function changeName(name: string) {
      animateController.name(name)
    }
    // 添加文件夹管理上面的分组
    const folder = gui.addFolder("设置立方体")
    folder.add(boxMesh.material, "wireframe").name("线框")

    // 更改颜色
    folder
      .addColor(params, "color")
      .name("颜色")
      .onChange((val) => {
        boxMesh.material.color.set(val)
      })

    // 默认展开folder
    folder.open()

    return () => {
      controller.update()
    }
  }

  return () => <ThreeContainer onRender={renderHandler} />
})
