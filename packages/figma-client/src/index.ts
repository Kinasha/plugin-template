import { Message, sendMsg2UI } from 'messager'
// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, {
  width: 375,
  height: 667,
})

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg: Message) => {
  console.log('🚀 ~ msg:', msg)
  figma.notify('🚀 ~ msg: ' + JSON.stringify(msg))
  if (msg.type === 'HELLO') {
    console.log('👋', msg.payload.name)
    const frame = figma.createFrame()
    figma.currentPage.appendChild(frame)
    figma.currentPage.selection = [frame]
    figma.viewport.scrollAndZoomIntoView([frame])
  }
}
