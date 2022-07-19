import { DefineComponent, defineAsyncComponent } from "vue"

type GroupItem = {
  group: string
  components: { label: string; component: DefineComponent }[]
}

type GroupItemConfig = {
  group: string
  components: Recordable<() => Promise<any>>
}

/** 页面配置 */
const config: GroupItemConfig[] = [
  {
    group: "Test",
    components: {
      TestPage: () => import("./test/MyTest.vue"),
      JsxTest: () => import("./test/JsxTest.jsx"),
      TsxTest: () => import("./test/TsxTest"), // tsx结尾的扩展名不用加上会校验报错
      VueTsx: () => import("./test/VueTsx.vue"),
    },
  },
  {
    group: "threejs demo",
    components: {
      创建场景: () => import("./threeDemo/CreateScene.vue"),
      创建线条: () => import("./threeDemo/CreateLines.vue"),
      创建线条带宽度: () => import("./threeDemo/CreateLineWithWidth.vue"),
      加载3d模型: () => import("./threeDemo/Loading3DModel.vue"),
      摄像机控制: () => import("./threeDemo/MouseControl.vue"),
      材质添加: () => import("./threeDemo/MaterialPage.vue"),
      地球卫星: () => import("./threeDemo/EarthDemo.vue"),
      "地球卫星+灯光": () => import("./threeDemo/EarthDemo02.vue"),
    },
  },
  {
    group: "shader 着色器",
    components: {
      默认的shader材质: () => import("./glslDemo/GLSLDemo01.vue"),
      TODO材质: () => import("./glslDemo/GLSLDemo02.vue"),
    },
  },
]

/** 解析配置 */
function resolveConfig(config: GroupItemConfig[]): GroupItem[] {
  const groups: GroupItem[] = []

  config.forEach((groupItem) => {
    const { group, components: componentConfigs } = groupItem
    const keys = Object.keys(componentConfigs)
    const components = keys.map((componentKey) => ({
      label: componentKey,
      component: defineAsyncComponent(componentConfigs[componentKey]),
    }))

    groups.push({ group, components })
  })

  return groups
}

const groups = resolveConfig(config)

export default groups
