import { addMessageListener } from 'messager'

mg.showUI(__html__, {
  width: 375,
  height: 667,
})

mg.on('run', () => {
  addMessageListener('HELLO', ({ data, reply }) => {
    console.log('💡', data)
    reply({ name: 'world' })
  })
})
