import * as THREE from "three"
import ThreeContainer, { RenderFunc } from "@/components/ThreeContainer"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default () => {
  const renderHandler: RenderFunc = ({ renderer, scene, camera }) => {
    const geometry = new THREE.BufferGeometry()
    const vertices = new Float32Array([
      -1.0, -1.0, 1.0,
      //
      1.0, -1.0, 1.0,
      //
      1.0, 1.0, 1.0,
      //
      -1.0, 1.0, 1.0,
      //
      -1.0, -1.0, 1.0,
      //
      1.0, 1.0, 1.0,
    ])

    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))

    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })

    const boxMesh = new THREE.Mesh(geometry, material)

    scene.add(boxMesh)

    new OrbitControls(camera, renderer.domElement)

    const helper = new THREE.AxesHelper(5)
    scene.add(helper)
  }

  return <ThreeContainer onRender={renderHandler} />
}
