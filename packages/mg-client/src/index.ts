import { addMessageListener } from 'shared/client-messager'

mg.showUI(__html__, {
  width: 375,
  height: 667,
})

mg.on('run', () => {
  addMessageListener('HELLO', ({ data, reply }) => {
    const text = mg.createText()
    text.characters = data.name
    mg.document.currentPage.appendChild(text)
    mg.viewport.scrollAndZoomIntoView([text])
    console.log('💡', data)
    reply({ name: 'world' })
  })
})
