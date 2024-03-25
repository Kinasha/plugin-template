import { VERSION } from '../constants'
import type { AllEventTypes, Payload, Reply } from '../schemas'
import type { Message, MessageReplyCallback } from '../types'
import { _postMessage, client, generateUUID } from '../utils'

const Listeners = new WeakMap<Function, string>()
const GlobalMessageMap = new Map<string, Map<string, Function>>()
const AskMessageMap = new Map<string, Function>()

client.ui.onmessage = (unknownEvent: Message<any> | { pluginMessage: Message<any> }) => {
  const event = 'pluginMessage' in unknownEvent ? unknownEvent.pluginMessage : unknownEvent
  const { type, id } = event
  if (GlobalMessageMap.has(type)) {
    const callbacks = GlobalMessageMap.get(type)
    callbacks?.forEach((callback) => {
      callback(event)
    })
  } else if (id && AskMessageMap.has(id)) {
    const callback = AskMessageMap.get(id)
    callback?.(event)
  }
}

function addMessageListener<T extends AllEventTypes>(type: T, callback: MessageReplyCallback<T>) {
  if (!GlobalMessageMap.has(type)) {
    GlobalMessageMap.set(type, new Map())
  }
  const callbacksMap = GlobalMessageMap.get(type)
  const callbackId = generateUUID()
  callbacksMap?.set(callbackId, (event: any) => {
    callback({
      ...event,
      reply: (replayData) => {
        _postMessage({
          version: VERSION,
          type,
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
  return new Promise((resolve, reject) => {
    const id = generateUUID()
    const callback = ({ data }: Message<T>) => {
      AskMessageMap.delete(id)
      resolve(data as Reply<T>)
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
