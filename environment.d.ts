declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE: string
      NODE_ENV: 'development' | 'production'
      PORT?: string
      JWT_SECRET: string
    }
  }
}

export { }
