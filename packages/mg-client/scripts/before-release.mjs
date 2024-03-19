import fs from 'node:fs'
const dist = fs.readdirSync('dist')
// remove  local.html test.html in dist
dist.forEach((file) => {
  if (file === 'local.html' || file === 'test.html') {
    fs.unlinkSync(`dist` + '/' + file)
  }
})
