declare namespace NodeJS {
  export interface ProcessEnv {
    readonly API_URL: string
    readonly JWT_SECRET: string
    readonly NEXT_PUBLIC_API_URL: string
    readonly GNS3_SUBDOMAIN: string
  }
}
