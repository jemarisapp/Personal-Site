import { WelcomeScreen } from '@/components/console/welcome'

// The front door: a PS5-style welcome screen. Entering goes to /home, so
// the browser's Back button returns here.
export default function Welcome() {
  return <WelcomeScreen />
}
