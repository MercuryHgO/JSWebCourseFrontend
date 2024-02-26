import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
// })

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react({babel: {plugins: ['styled-jsx/babel']}})],
    server: {
      host: true
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    preview: {
      port: 8080,
      strictPort: true
    },
    base: '/'
  }
})