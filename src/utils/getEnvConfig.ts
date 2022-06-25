type EnvConfigType = {
  baseUrl: string
  isDev: boolean
  isProduction: boolean
}
export function getEnvConfig(): EnvConfigType {
  return {
    baseUrl: import.meta.env.VITE_CESIUM_MODEL_BASE_URL,
    isDev: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
  }
}
export const envConfig = getEnvConfig()
