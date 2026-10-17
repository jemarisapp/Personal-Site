'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { PROFILE } from '@/lib/work'
import s from './contact.module.css'

// Each topic opens the visitor's email app with a subject and a short
// prompt already filled in. There's no form backend to fail or spam.
const TOPICS = [
  {
    id: 'role',
    label: 'A full-time role',
    subject: 'Design role',
    body: 'Hi Jemari,\n\nI’m reaching out about a role at [company]:\n\n',
  },
  {
    id: 'project',
    label: 'A freelance project',
    subject: 'Project inquiry',
    body: 'Hi Jemari,\n\nI’d like to talk about a project.\n\nWhat it is:\nTimeline:\nBudget:\n\n',
  },
  {
    id: 'hello',
    label: 'Just saying hi',
    subject: 'Hello',
    body: 'Hi Jemari,\n\n',
  },
]

function mailto(subject: string, body: string) {
  return `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function ContactPanel() {
  const [topic, setTopic] = useState(TOPICS[0])
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be blocked; the address is visible to select by hand.
    }
  }

  return (
    <div className={s.panel}>
      <div className={s.emailRow}>
        <a href={`mailto:${PROFILE.email}`} className={s.email}>
          {PROFILE.email}
        </a>
        <button type="button" className={s.copy} onClick={copy} aria-live="polite">
          {copied ? 'Copied' : 'Copy email'}
        </button>
      </div>

      <fieldset className={s.topics}>
        <legend>What’s it about?</legend>
        <div className={s.topicList}>
          {TOPICS.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={topic.id === t.id}
              onClick={() => setTopic(t)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <a href={mailto(topic.subject, topic.body)} className={s.write}>
          Write the email
        </a>
        <p className={s.hint}>Opens your email app with a subject filled in.</p>
      </fieldset>

      <ul className={s.elsewhere}>
        <li>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
            <span>LinkedIn</span>
            <span className={s.dim}>Connect</span>
          </a>
        </li>
        <li>
          <Link href={PROFILE.resume}>
            <span>Résumé</span>
            <span className={s.dim}>View or download</span>
          </Link>
        </li>
        <li>
          <a href="https://trispstudio.com" target="_blank" rel="noreferrer">
            <span>TRISP Studio</span>
            <span className={s.dim}>For freelance work</span>
          </a>
        </li>
        <li>
          <span>{PROFILE.location}</span>
          <span className={s.dim}>Where I’m based</span>
        </li>
      </ul>
    </div>
  )
}
