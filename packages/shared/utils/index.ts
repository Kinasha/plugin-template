import { Message } from '../types'

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

class Platform {
  platform: 'figma' | 'mg' | undefined
  constructor() {
    this.platform = undefined
  }
  get client() {
    // @ts-ignore
    if (typeof mg !== 'undefined') {
      this.platform = 'mg'
      // @ts-ignore
      return mg
      // @ts-ignore
    } else if (typeof figma !== 'undefined') {
      this.platform = 'figma'
      // @ts-ignore
      return figma
    }
  }
}
const p = new Platform()
const client = p.client
const platform = p.platform

const _postMessage = (event: Message<unknown>) => {
  if (platform === 'mg') {
    client.ui.postMessage({
      pluginMessage: event,
    })
  } else if (platform === 'figma') {
    client.ui.postMessage(event)
  }
}

export { generateUUID, client, platform, _postMessage }
