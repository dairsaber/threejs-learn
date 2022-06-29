import MyTest from "./test/MyTest.vue"
import CreateScene from "./threeDemo/CreateScene.vue"
import CreateLinesVue from "./threeDemo/CreateLines.vue"
import CreateLineWithWidthVue from "./threeDemo/CreateLineWithWidth.vue"
import Loading3DModelVue from "./threeDemo/Loading3DModel.vue"
import MouseControlVue from "./threeDemo/MouseControl.vue"
import MaterialPage from "./threeDemo/MaterialPage.vue"

// 在此注册示例
export default {
  [MyTest.name]: MyTest,
  [CreateScene.name]: CreateScene,
  [CreateLinesVue.name]: CreateLinesVue,
  [CreateLineWithWidthVue.name]: CreateLineWithWidthVue,
  [Loading3DModelVue.name]: Loading3DModelVue,
  [MouseControlVue.name]: MouseControlVue,
  [MaterialPage.name]: MaterialPage,
}
