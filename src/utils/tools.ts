import { envConfig } from "./getEnvConfig"
export function getUrl(url: string): string {
  if (url.startsWith("http")) return url

  return envConfig.baseUrl + url
}
