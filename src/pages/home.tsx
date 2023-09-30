import Image from 'next/image'
import { Inter } from 'next/font/google'
import EventForm from '@/components/EventForm'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <EventForm />
    </div>
  )
}

