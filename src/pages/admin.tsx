import Image from 'next/image'
import { Inter } from 'next/font/google'
import EventForm from '@/components/EventForm'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div>
        <h3 className="text-lg font-medium">Event Form</h3>
        <p className="text-sm text-muted-foreground">
          Form to track your events
        </p>
      </div>
      <EventForm />
    </main>
  )
}

