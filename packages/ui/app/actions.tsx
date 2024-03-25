'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { addMessageListener, invoke, removeMessageListener, sendMessage } from 'shared/ui-messager'
import { useState } from 'react'

export default function Action() {
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [inputVal, setInputVal] = useState('')

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
      <div>
        <input type='text' className='rounded-md border-solid border-2 border-slate-400 w-60 h-10' onChange={(e) => setInputVal(e.target.value)} />
        <Button
          onClick={async () => {
            const res = await invoke('HELLO', {
              name: inputVal,
            })
            alert(JSON.stringify(res))
          }}>
          invoke
        </Button>
      </div>
      <Button
        onClick={() => {
          addMessageListener('GOODBYE', ({ data }) => {
            console.log('💡', data)
          })
        }}>
        addMessageListener
      </Button>
      <Button
        onClick={() => {
          sendMessage('HELLO', {
            name: 'hello',
          })
        }}>
        sendMessage
      </Button>
      <Button
        onClick={() => {
          removeMessageListener('GOODBYE', ({ data }) => {
            console.log('💡', data)
          })
        }}>
        removeMessageListener
      </Button>
    </>
  )
}
