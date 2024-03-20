'use client'
import { Button } from '@/components/ui/button'
import { sendMsg2Plugin } from 'messager'

export default function Action() {
  return (
    <Button
      onClick={() =>
        sendMsg2Plugin({
          type: 'HELLO',
          payload: {
            name: 'world',
          },
        })
      }>
      click me
    </Button>
  )
}
