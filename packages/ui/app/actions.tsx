'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { invoke, sendMessage } from '@/lib/message'
import { useState } from 'react'

export default function Action() {
  const [isDragOver, setIsDragOver] = useState<boolean>(false)

  return (
    <>
      <div
        className={cn(`flex border-2 border-dashed size-40 ${isDragOver ? 'bg-blue-400' : 'bg-slate-400'}`)}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setIsDragOver(false)
        }}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragOver(false)
          console.log('💡', e.dataTransfer.files)
        }}>
        <span>drop here</span>
      </div>
      <Button
        onClick={async () => {
          // sendMsg2Plugin({
          //   type: 'HELLO',
          //   payload: {
          //     name: 'world',
          //   },
          // })
          const res = await invoke('HELLO', { name: 'hello' })
          console.log('🚀 ~ onClick={ ~ res:', res)
        }}>
        click me
      </Button>
    </>
  )
}
