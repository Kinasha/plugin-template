import type { Message, MessageCallback, MessageReplyCallback } from './types'
import { _postMessage, client, generateUUID } from './utils'

const Listeners = new WeakMap<MessageReplyCallback<unknown>, string>()
const GlobalMessageMap = new Map<string, Map<string, MessageCallback<unknown>>>()
const AskMessageMap = new Map<string, MessageCallback<unknown>>()

client.ui.onmessage = (unknownEvent: Message<unknown> | { pluginMessage: Message<unknown> }) => {
  const event = 'pluginMessage' in unknownEvent ? unknownEvent.pluginMessage : unknownEvent
  const { type, id, replyId, data } = event
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

function addMessageListener<T>(type: string, callback: MessageReplyCallback<T>) {
  if (!GlobalMessageMap.has(type)) {
    GlobalMessageMap.set(type, new Map())
  }
  const callbacksMap = GlobalMessageMap.get(type)
  const callbackId = generateUUID()
  callbacksMap?.set(callbackId, (event) => {
    const { replyId } = event
    // @ts-ignore
    callback({
      ...event,
      reply: (replayData) => {
        _postMessage({
          version: '1',
          type,
          id: replyId ?? '',
          data: replayData,
        })
      },
    })
  })
}

function removeMessageListener(type: string, callback: MessageReplyCallback<unknown>) {
  const typeMap = GlobalMessageMap.get(type)
  const id = Listeners.get(callback)
  if (typeMap && id) {
    typeMap.delete(id)
  }
}
function sendMessage(type: string, data: any) {
  _postMessage({
    version: '1',
    type,
    id: generateUUID(),
    data,
  })
}
function invoke(type: string, data: any) {
  return new Promise((resolve, reject) => {
    const id = generateUUID()
    const callback = ({ data }: Message<unknown>) => {
      AskMessageMap.delete(id)
      resolve(data)
    }
    AskMessageMap.set(id, callback)
    _postMessage({
      version: '1',
      type,
      replyId: id,
      data,
    })
  })
}

export { addMessageListener, removeMessageListener, sendMessage, invoke }
