import * as THREE from "three"
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { AnimationController } from "../animation/AnimationController"

type TypeOfClassMethod<T, M extends keyof T> = T[M] extends Function ? T[M] : never

export async function loadGltf(
  path: string,
  onProgress?: Parameters<TypeOfClassMethod<GLTFLoader, "load">>[2],
): Promise<GLTF> {
  const gltfLoader = new GLTFLoader()

  return new Promise((r, rj) => {
    gltfLoader.load(path, r, onProgress, rj)
  })
}

export function createAnimationController(gltf: GLTF) {
  const mixer = new THREE.AnimationMixer(gltf.scene)
  const animations = gltf.animations

  return new AnimationController(mixer, animations)
}
