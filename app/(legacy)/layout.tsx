import { ThemeProvider } from 'next-themes'
import { Header } from './header'
import { Footer } from './footer'

// Pre-redesign pages. They keep their old chrome until each one is rebuilt
// as a case study under /work.
export default function LegacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      enableSystem={true}
      attribute="class"
      storageKey="theme"
      defaultTheme="dark"
    >
      <div className="legacy min-h-dvh w-full bg-white tracking-tight dark:bg-zinc-950">
        <div className="relative mx-auto w-full max-w-screen-sm px-4 pt-20">
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}
