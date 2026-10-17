import type { Metadata } from 'next'
import { SiteBar } from '@/components/case/site-bar'
import { ContactPanel } from './contact-panel'
import s from './contact.module.css'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Jemari Sapp about design roles, freelance projects, or anything else.',
}

export default function Contact() {
  return (
    <div className={s.page}>
      <SiteBar />
      <main className={s.main}>
        <h1 className={s.title}>Let’s talk.</h1>
        <p className={s.lede}>
          I’m open to full-time design roles, and I take on freelance work through TRISP Studio. The fastest way to
          reach me is email.
        </p>
        <ContactPanel />
      </main>
    </div>
  )
}
