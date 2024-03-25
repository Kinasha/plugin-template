import fs from 'node:fs'
import { exec } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import chokidar from 'chokidar'

chokidar.watch('../dist').on('all', (event, path) => {
  exec(`echo "watch-file.mjs: ${event} ${path}"`)
  exec(`./reload.apple.sh`)
})
// const __dirname = path.dirname(fileURLToPath(import.meta.url))
// const file = path.resolve(__dirname, 'main.js')
// console.log('💡', file)
// const mainJSPath = path.resolve(__dirname, '../dist/main.js')
// fs.watch(mainJSPath, (eventType, filename) => {
//   exec(`echo "watch-file.mjs: ${eventType} ${filename}"`)
//   exec(`./reload.apple.sh`)
// })
