import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.jemarisapp.com/'),
  alternates: {
    canonical: '/'
  },
  title: {
    default: 'Jemari Sapp - MSIS Candidate | AI For Business Innovation',
    template: '%s | Jemari Sapp'
  },
  description: 'Portfolio of Jemari Sapp, an MSIS Candidate & AI For Business Innovation specialist building autonomous systems.',
  keywords: ['AI', 'Product Management', 'MSIS', 'Autonomous Systems', 'Business Innovation', 'Jemari Sapp'],
  authors: [{ name: 'Jemari Sapp', url: 'https://www.jemarisapp.com' }],
  creator: 'Jemari Sapp',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.jemarisapp.com',
    siteName: 'Jemari Sapp',
    title: 'Jemari Sapp - AI For Business Innovation',
    description: 'Portfolio of Jemari Sapp, an MSIS Candidate & AI For Business Innovation specialist building autonomous systems.',
    images: [
      {
        url: '/cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Jemari Sapp Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jemari Sapp - AI For Business Innovation',
    description: 'Portfolio of Jemari Sapp, an MSIS Candidate & AI For Business Innovation specialist building autonomous systems.',
    images: ['/cover.jpg'],
    creator: '@jemarisapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-white tracking-tight antialiased dark:bg-zinc-950`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Jemari Sapp",
              "url": "https://www.jemarisapp.com",
              "jobTitle": "MSIS Candidate & AI For Business Innovation Specialist",
              "description": "Building autonomous systems and AI-powered solutions for business innovation.",
              "sameAs": [
                "https://www.linkedin.com/in/jemarisapp"
              ]
            })
          }}
        />
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="dark"
        >
          <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
            <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-20">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
