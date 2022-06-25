import { core } from "./core"
import BasicVue from "@/pages/examples/basic/BasicPage.vue"
import TestVue from "@/pages/examples/test/MyTest.vue"

export function sayHello() {
  console.log("sayhello :>> ", core.getViewer, BasicVue.name, TestVue.name)
}
