import { AllEventTypes, Payload, Reply } from '../schemas'

type Message<T extends AllEventTypes> = {
  version: string
  type: string
  id?: string
  replyId?: string
  data: Payload<T>
}

type MessageCallback<T extends AllEventTypes> = (event: Message<T>) => void

type MessageWithReply<T extends AllEventTypes> = Message<T> & {
  reply(replayData: Reply<T>): void
}

type MessageReplyCallback<T extends AllEventTypes> = (event: MessageWithReply<T>) => void

type AddMessageListenerFunction<T extends AllEventTypes> = (type: T, callback: MessageReplyCallback<T>) => void

type RemoveMessageListenerFunction<T extends AllEventTypes> = (type: T, callback: MessageReplyCallback<T>) => void

type SendMessageFunction<T extends AllEventTypes> = (type: T, data: Payload<T>) => void

type InvokeFunction<T extends AllEventTypes> = (type: T, data: Payload<T>) => Promise<Reply<T>>

export type { Message, MessageCallback, MessageReplyCallback, AddMessageListenerFunction, RemoveMessageListenerFunction, SendMessageFunction, InvokeFunction }
