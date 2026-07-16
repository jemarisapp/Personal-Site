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
    default: 'Jemari Sapp - AI Systems Portfolio',
    template: '%s | Jemari Sapp'
  },
  description: 'Portfolio of Jemari Sapp, an MS Information Systems candidate building AI-powered systems, workflow automation, legal AI tools, analytics platforms, and business operations software.',
  keywords: ['AI Systems', 'Workflow Automation', 'Legal AI', 'Multi-Agent Systems', 'RAG', 'Business Innovation', 'Product Engineering', 'Jemari Sapp'],
  authors: [{ name: 'Jemari Sapp', url: 'https://www.jemarisapp.com' }],
  creator: 'Jemari Sapp',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.jemarisapp.com',
    siteName: 'Jemari Sapp',
    title: 'Jemari Sapp - AI Systems Portfolio',
    description: 'Portfolio of Jemari Sapp, an MS Information Systems candidate building AI-powered systems, workflow automation, legal AI tools, analytics platforms, and business operations software.',
    images: [
      {
        url: '/cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Jemari Sapp AI Systems Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jemari Sapp - AI Systems Portfolio',
    description: 'Portfolio of Jemari Sapp, an MS Information Systems candidate building AI-powered systems, workflow automation, legal AI tools, analytics platforms, and business operations software.',
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
              "jobTitle": "MSIS Candidate",
              "description": "AI engineering candidate focused on multi-agent systems, automation, and product design.",
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
          <div className="flex min-h-dvh w-full flex-col font-[family-name:var(--font-inter-tight)]">
            <div className="relative mx-auto flex min-h-dvh w-full max-w-screen-sm flex-col px-4 pt-20">
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
