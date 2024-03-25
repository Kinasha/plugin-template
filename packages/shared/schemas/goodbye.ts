import { z } from 'zod'
import { baseSchema } from './base'

export const Goodbye = baseSchema.extend({
  type: z.literal('GOODBYE'),
  data: z.object({
    age: z.string(),
  }),
})
