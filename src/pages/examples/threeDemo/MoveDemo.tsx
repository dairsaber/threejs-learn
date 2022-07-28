import * as THREE from "three"
import ThreeContainer, { RenderFunc } from "@/components/ThreeContainer"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default () => {
  const renderHandler: RenderFunc = ({ renderer, scene, camera }) => {
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
    scene.add(boxMesh)

    new OrbitControls(camera, renderer.domElement)

    // 创建坐标辅助器
    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)

    renderer.setClearColor("#eee")

    return (time: number) => {
      console.log("time :>> ", time)
      const second = time / 1000
      boxMesh.position.set(Math.sin(second) + 1, Math.cos(second) + 1, Math.sin(second) * 2 + 2)
    }
  }

  return <ThreeContainer onRender={renderHandler} />
}
