import { defineAsyncComponent } from "vue"
import MyTest from "./test/MyTest.vue"
import CreateScene from "./threeDemo/CreateScene.vue"
import CreateLinesVue from "./threeDemo/CreateLines.vue"
import CreateLineWithWidthVue from "./threeDemo/CreateLineWithWidth.vue"
import Loading3DModelVue from "./threeDemo/Loading3DModel.vue"
import MouseControlVue from "./threeDemo/MouseControl.vue"
import MaterialPage from "./threeDemo/MaterialPage.vue"

type GroupItem = { group: string; components: Recordable }
// 在此注册示例
const groups: GroupItem[] = [
  {
    group: "threejs demo",
    components: {
      [MyTest.name]: MyTest,
      [CreateScene.name]: CreateScene,
      [CreateLinesVue.name]: CreateLinesVue,
      [CreateLineWithWidthVue.name]: CreateLineWithWidthVue,
      [Loading3DModelVue.name]: Loading3DModelVue,
      [MouseControlVue.name]: MouseControlVue,
      [MaterialPage.name]: MaterialPage,
    },
  },
  // 动态异步组件
  {
    group: "shader demo",
    components: {
      默认的shader材质: defineAsyncComponent(
        () => import("./glslDemo/GLSLDemo01.vue")
      ),
      GLSLDemo02: defineAsyncComponent(
        () => import("./glslDemo/GLSLDemo02.vue")
      ),
    },
  },
]

export default groups

// TODO 后面打算写个解析器动态加载examples里面的模块
