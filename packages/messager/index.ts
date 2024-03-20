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
  try {
    if (messageSchema.safeParse(msg).success) {
      // @ts-ignore
      if (typeof mg !== undefined) {
        parent.postMessage(msg, '*')
        // @ts-ignore
      } else if (typeof figma !== undefined) {
        parent.postMessage({ pluginMessage: msg }, '*')
      }
    }
  } catch (e) {
    console.error('sendMsg2Plugin:', e)
  }
}
