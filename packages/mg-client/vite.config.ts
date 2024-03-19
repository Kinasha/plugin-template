import { defineConfig } from 'vite'
import path from 'node:path'

const target = process.env.TARGET

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'main',
      formats: ['umd'],
      fileName: () => `main.js`,
    },
  },
})
