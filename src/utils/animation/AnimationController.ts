// TODO 这边到时候支持全部播放 和同时播放多个或者暂停多个
export class AnimationController {
  private _mixer: THREE.AnimationMixer
  private _animations: THREE.AnimationClip[]
  private _activeAction: Nullable<THREE.AnimationAction> = null

  constructor(mixer: THREE.AnimationMixer, animations: THREE.AnimationClip[]) {
    this._mixer = mixer
    this._animations = animations
  }

  // 播放默认的动画
  // this.playAction(0);

  // 暂停动画
  pause() {
    this._activeAction?.stop()
  }

  // 恢复动画
  resume() {
    this._activeAction?.play()
  }

  // 播放指定索引位置的动画
  playAction(index: number) {
    const animation = this._animations[index]
    const action = this._mixer.clipAction(animation)

    if (this._activeAction) {
      this._activeAction.stop()
    }

    this._activeAction = action
    this._activeAction.play()
  }

  update(duration: number) {
    return this._mixer.update(duration)
  }
}
