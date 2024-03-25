import { Hello } from './hello'
import { Goodbye } from './goodbye'
import { z } from 'zod'

// Define a type that represents all possible events
type AllEvents = z.infer<typeof Hello> | z.infer<typeof Goodbye>

// Define a type that represents the type of the 'type' property in AllEvents
export type AllEventTypes = AllEvents['type']

export type Payload<T> = T extends AllEventTypes ? Extract<AllEvents, { type: T }>['data'] : never
export type Reply<T> = T extends AllEventTypes ? Extract<AllEvents, { type: T }>['replyData'] : never
