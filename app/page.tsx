import { ConsoleHome } from '@/components/console/console-home'

// Skip the welcome screen for returning visitors in the same session and for
// direct links to a shelf. Runs before paint so the screen never flashes.
const skipWelcome = `try{if(sessionStorage.getItem('welcome-seen')||new URLSearchParams(location.search).has('shelf'))document.documentElement.dataset.welcomeSeen='1'}catch(e){}`

export default function Home() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: skipWelcome }} />
      <ConsoleHome />
    </>
  )
}
