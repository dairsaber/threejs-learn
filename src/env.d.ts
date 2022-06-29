/// <reference types="vite/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CESIUM_MODEL_BASE_URL: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "*.vue" {
  import type { DefineComponent } from "vue"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Windows 上挂在的全局变量
declare interface Window {}

declare type Undefable<T> = T | undefined

declare type Nullable<T> = T | null

declare type UndefOrNullable<T> = T | null | undefined

declare type Recordable<T = any> = Record<string, T>
