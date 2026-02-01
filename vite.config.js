import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  // This tells Vite to treat these files as static assets
  assetsInclude: ['**/*.JPEG', '**/*.JPG', '**/*.PNG', '**/*.SVG', '**/*.HEIC'],
})
