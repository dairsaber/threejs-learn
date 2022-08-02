import * as THREE from "three"
import ThreeContainer, { RenderFunc } from "@/components/ThreeContainer"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default () => {
  const renderHandler: RenderFunc = ({ renderer, scene, camera }) => {
    camera.position.z = 10
    // 创建50个三角形
    for (let i = 0; i < 50; i++) {
      const geometry = new THREE.BufferGeometry()
      const positionArray = new Float32Array(9)
      for (let j = 0; j < positionArray.length; j++) {
        positionArray[j] = Math.random() * 5 - 2.5
      }

      const color = new THREE.Color(Math.random(), Math.random(), Math.random())
      geometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3))
      const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5 })
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)
    }

    new OrbitControls(camera, renderer.domElement)

    const helper = new THREE.AxesHelper(5)
    scene.add(helper)
  }

  return <ThreeContainer onRender={renderHandler} />
}
