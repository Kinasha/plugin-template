const isClient = typeof window !== 'undefined'

type Message<T> = {
  version: string
  type: string
  id?: string
  replyId?: string
  data: T
}

type MessageCallback<T> = (event: Message<T>) => void

type MessageWithReply<T> = Message<T> & {
  reply(replayData: any): void
}

type MessageReplyCallback<T> = (event: MessageWithReply<T>) => void

const Listeners = new WeakMap<MessageReplyCallback<unknown>, string>()
const GlobalMessageMap = new Map<string, Map<string, MessageCallback<unknown>>>()
const AskMessageMap = new Map<string, MessageCallback<unknown>>()
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
const _postMessage = (event: Message<unknown>) => {
  global.parent.postMessage(
    {
      pluginMessage: event,
      pluginId: '*',
    },
    '*'
  )
}
if (isClient) {
  window.addEventListener('message', (event: MessageEvent<{ pluginMessage: Message<unknown> }>) => {
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

function addMessageListener<T>(type: string, callback: MessageReplyCallback<T>) {
  if (!GlobalMessageMap.has(type)) {
    GlobalMessageMap.set(type, new Map())
  }
  const typeMap = GlobalMessageMap.get(type)
  const mapId = generateUUID()
  typeMap?.set(mapId, (event) => {
    const { replyId } = event
    // @ts-ignore
    callback({
      ...event,
      reply: (replayData) => {
        _postMessage({
          version: '1',
          type: `${type}_reply`,
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
