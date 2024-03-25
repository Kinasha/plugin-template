import fs from 'node:fs'
import { argv } from 'node:process'
import { fileURLToPath } from 'node:url'

const env = argv[2] || 'local'
const manifestPath = fileURLToPath(new URL('../manifest.json', import.meta.url))
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
manifest.ui = `dist/${env}.html`
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
console.log('💡 done, env is', env)
