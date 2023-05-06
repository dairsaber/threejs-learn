import type { RouteRecordRaw } from "vue-router"
const modules = import.meta.glob("./modules/**/*.ts", { eager: true })
/** 一张图上面的页面路由 */
const routeModuleList: RouteRecordRaw[] = []

Object.keys(modules).forEach((key) => {
  const mod = (modules[key] as Recordable).default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

export const basicRoutes = [...routeModuleList]
