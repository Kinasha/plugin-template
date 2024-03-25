import { cn } from '@/lib/utils'
import Action from './actions'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1 className={cn('font-mono font-extrabold text-3xl')}>11My Plugin</h1>
      <Action />
    </main>
  )
}
