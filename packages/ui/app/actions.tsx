'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { sendMsg2Plugin } from 'messager'
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
        <input
          type='text'
          onPaste={(e) => {
            const items = e.clipboardData.items
            if (items.length === 1 && items[0].type.indexOf('image') !== -1) {
              // 复制的是图片
              e.preventDefault()
              const file = items[0].getAsFile()
              console.log('💡', file)
            }
          }}
        />
      </div>
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
    </>
  )
}
