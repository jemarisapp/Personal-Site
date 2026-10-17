import type { Metadata } from 'next'
import { ConsoleHome } from '@/components/console/console-home'

export const metadata: Metadata = {
  title: 'Home',
  alternates: { canonical: '/home' },
}

export default function Home() {
  return <ConsoleHome />
}
