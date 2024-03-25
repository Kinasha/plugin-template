import { VERSION } from '../constants'
import { AllEventTypes, Payload, Reply } from '../schemas'
import { Message, MessageReplyCallback } from '../types'
const isClient = typeof window !== 'undefined'

const Listeners = new WeakMap<Function, string>()
const GlobalMessageMap = new Map<string, Map<string, Function>>()
const AskMessageMap = new Map<string, Function>()

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
const _postMessage = (event: Message<any>) => {
  if (typeof window !== 'undefined' && window.parent) {
    window.parent.postMessage(
      {
        pluginMessage: event,
        pluginId: '*',
      },
      '*'
    )
  }
}
if (isClient) {
  window.addEventListener('message', (event: MessageEvent<{ pluginMessage: Message<any> }>) => {
    const realEvent = event.data.pluginMessage
    const { type, id } = realEvent
    if (GlobalMessageMap.has(type)) {
      const set = GlobalMessageMap.get(type)
      set!.forEach((callback) => callback(realEvent))
    } else if (id && AskMessageMap.has(id)) {
      AskMessageMap.get(id)!(realEvent)
    }
  })
}

function addMessageListener<T extends AllEventTypes>(type: T, callback: MessageReplyCallback<T>) {
  if (!GlobalMessageMap.has(type)) {
    GlobalMessageMap.set(type, new Map())
  }
  const typeMap = GlobalMessageMap.get(type)
  const mapId = generateUUID()
  typeMap?.set(mapId, (event) => {
    const { replyId } = event
    callback({
      ...event,
      reply: (replayData) => {
        _postMessage({
          version: VERSION,
          type,
          id: replyId ?? '',
          data: replayData,
        })
      },
    })
  })
}

function removeMessageListener<T extends AllEventTypes>(type: T, callback: MessageReplyCallback<T>) {
  const typeMap = GlobalMessageMap.get(type)
  const id = Listeners.get(callback)
  if (typeMap && id) {
    typeMap.delete(id)
  }
}

function sendMessage<T extends AllEventTypes>(type: T, data: Payload<T>) {
  _postMessage({
    version: VERSION,
    type,
    id: generateUUID(),
    data,
  })
}

function invoke<T extends AllEventTypes>(type: T, data: Payload<T>) {
  return new Promise<Reply<T>>((resolve, reject) => {
    const id = generateUUID()
    const callback = ({ data }: Reply<T>) => {
      AskMessageMap.delete(id)
      resolve(data)
    }
    AskMessageMap.set(id, callback)
    _postMessage({
      version: VERSION,
      type,
      replyId: id,
      data,
    })
  })
}

export { addMessageListener, removeMessageListener, sendMessage, invoke }
