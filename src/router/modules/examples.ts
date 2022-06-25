import DefaultLayOut from "@/layouts/defaultLayout/DefaultLayOut.vue"
import type { RouteRecordRaw } from "vue-router"

const examplesRoute: RouteRecordRaw = {
  name: "ExampleRoute",
  path: "/",
  redirect: "/examples",
  component: DefaultLayOut,
  children: [
    {
      name: "ExampleIndex",
      path: "examples",
      component: () => import("@/pages/examples/ExamplesPage.vue"),
    },
  ],
}

export default examplesRoute
