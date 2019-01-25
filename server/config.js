export const dev = process.env.NODE_ENV !== 'production'
export const port = parseInt(process.env.PORT, 10) || 8000
export const ROOT_URL = dev ? `http://localhost:${port}` : process.env.PRODUCTION_URL
