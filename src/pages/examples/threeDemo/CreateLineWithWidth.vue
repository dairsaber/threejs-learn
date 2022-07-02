<script lang="ts" setup name="CreateLineWithWidth">
  import { onMounted, ref } from "vue"
  import * as THREE from "three"

  // 这边画宽度线则需要去exaples中找line2的代码
  import { LineMaterial } from "three/examples/jsm/lines/LineMaterial"
  import { LineGeometry } from "three/examples/jsm/lines/LineGeometry"
  import { Line2 } from "three/examples/jsm/lines/Line2"

  const container = ref<HTMLDivElement>()
  onMounted(initThree)

  function initThree() {
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

    container.value?.appendChild(renderer.domElement)

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)

    camera.position.set(0, 0, 100)
    camera.lookAt(0, 0, 0)

    const scene = new THREE.Scene()

    // 这边line的材质使用example中的
    const material = new LineMaterial({
      color: 0x0000ff,
      linewidth: 15,
    })

    material.resolution.set(window.innerWidth, window.innerHeight)

    const points = [-10, 0, 0, 0, 10, 0, 20, 0, 0]

    const geometry = new LineGeometry().setPositions(points)

    const line = new Line2(geometry, material)

    line.computeLineDistances()

    scene.add(line)

    renderer.render(scene, camera)
  }
</script>

<template>
  <div ref="container"></div>
</template>

<style lang="less" scoped></style>
