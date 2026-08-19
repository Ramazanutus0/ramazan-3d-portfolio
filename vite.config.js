import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  server: {
    // /admin gibi tüm URL'leri index.html'e yönlendir (SPA routing)
    historyApiFallback: true,
    host: true,   // local network erişimi
  },
  preview: {
    historyApiFallback: true,
  },
})
