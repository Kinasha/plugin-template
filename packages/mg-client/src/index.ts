import { Message, sendMsg2UI } from 'messager'

mg.showUI(__html__, {
  width: 375,
  height: 667,
})
mg.on('selectionchange', (e: any) => {
  console.log('💡', e)
  sendMsg2UI({
    type: 'GOODBYE',
    payload: {
      age: 18,
    },
  })
})

mg.ui.onmessage = (msg: Message) => {
  mg.notify('🚀 ~ msg: ' + JSON.stringify(msg))
  if (msg.type === 'HELLO') {
    console.log('👋', msg.payload.name)
    const frame = mg.createFrame()
    mg.document.currentPage.appendChild(frame)
    mg.document.currentPage.selection = [frame]
    mg.viewport.scrollAndZoomIntoView([frame])
  }
}
