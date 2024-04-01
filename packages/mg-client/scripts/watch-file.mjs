import fs from 'node:fs'
import { exec } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import chokidar from 'chokidar'

const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist')

const shell = `
#!/usr/bin/env bash
osascript <<'EOF'
tell application "MasterGo" to activate
tell application "System Events" to tell process "MasterGoPrivate"
    keystroke "p" using {command down, option down}
end tell
EOF
`
chokidar.watch(distDir).on('all', (event, path) => {
  exec(`echo "watch-file.mjs: ${event} ${path}"`)
  exec(shell)
})
// const __dirname = path.dirname(fileURLToPath(import.meta.url))
// const file = path.resolve(__dirname, 'main.js')
// console.log('💡', file)
// const mainJSPath = path.resolve(__dirname, '../dist/main.js')
// fs.watch(mainJSPath, (eventType, filename) => {
//   exec(`echo "watch-file.mjs: ${eventType} ${filename}"`)
//   exec(`./reload.apple.sh`)
// })
