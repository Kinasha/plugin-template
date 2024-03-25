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

export type { Message, MessageCallback, MessageReplyCallback }
