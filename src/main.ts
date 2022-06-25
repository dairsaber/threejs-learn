import { createApp } from "vue"
import "./styles/index.less"
import App from "./App.vue"

import { setupRouter } from "@/router/index"

async function bootstrap() {
  const app = createApp(App)

  // 初始化路由
  setupRouter(app)

  app.mount("#app")
}

bootstrap()
