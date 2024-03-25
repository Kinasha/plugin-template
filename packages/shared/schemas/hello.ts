import { z } from 'zod'
import { baseSchema } from './base'

export const Hello = baseSchema.extend({
  type: z.literal('HELLO'),
  data: z.object({
    name: z.string(),
  }),
  replyData: z.object({
    name: z.string(),
  }),
})
