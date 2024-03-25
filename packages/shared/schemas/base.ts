import { z } from 'zod'

// 定义一个基础的 schema
export const baseSchema = z.object({
  type: z.literal('DEFAULT'),
  data: z.undefined(),
  replyData: z.undefined(),
})
