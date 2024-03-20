import { z } from 'zod'

// 定义 Zod schemas
const helloSchema = z.object({
  type: z.literal('HELLO'),
  payload: z.object({
    name: z.string(),
  }),
})

const goodbyeSchema = z.object({
  type: z.literal('GOODBYE'),
  payload: z.object({
    age: z.number(),
  }),
})

const messageSchema = z.union([helloSchema, goodbyeSchema])

export type Message = z.infer<typeof messageSchema>

export function sendMsg2UI(msg: z.infer<typeof messageSchema>) {
  try {
    if (messageSchema.safeParse(msg).success) {
      // @ts-ignore
      if (typeof mg !== undefined) {
        // @ts-ignore
        mg.ui.postMessage(msg)
        // @ts-ignore
      } else if (typeof figma !== undefined) {
        // @ts-ignore
        figma.ui.postMessage(msg)
      }
      console.log('sendMsg2UI:', msg)
    }
  } catch (e) {
    console.error('sendMsg2UI:', e)
  }
}

export function sendMsg2Plugin(msg: z.infer<typeof messageSchema>) {
  console.log('🚀 ~ sendMsg2Plugin ~ msg:', msg)
  try {
    if (messageSchema.safeParse(msg).success) {
      // get current search params
      const url = new URL(location.href)
      const searchParams = url.searchParams
      const platform = searchParams.get('platform')
      if (platform === 'mastergo') {
        parent.postMessage(msg, '*')
      } else if (platform === 'figma') {
        // Note: you cant change this pluginId to your's
        parent.postMessage({ pluginMessage: msg, pluginId: '1352242706443883282' }, '*')
      }
    }
  } catch (e) {
    console.error('sendMsg2Plugin:', e)
  }
}

export function invoke() {
  return new Promise(async (resolve, reject) => {
    sendMsg2Plugin({
      type: 'HELLO',
      payload: {
        name: 'world',
      },
    })
    const res = '1'
    resolve(res)
  })
}
