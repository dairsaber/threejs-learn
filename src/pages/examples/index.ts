import MyTest from "./test/MyTest.vue"
import CreateScene from "./threeDemo/CreateScene.vue"
import CreateLinesVue from "./threeDemo/CreateLines.vue"

// 在此注册示例
export default {
  [MyTest.name]: MyTest,
  [CreateScene.name]: CreateScene,
  [CreateLinesVue.name]: CreateLinesVue,
}
