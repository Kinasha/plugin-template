'use client'
import { sendMsg2Plugin } from 'messager'

export default function Button() {
  return (
    <button
      onClick={() => {
        sendMsg2Plugin({
          type: 'HELLO',
          payload: {
            name: 'world',
          },
        })
      }}>
      say hi
    </button>
  )
}
