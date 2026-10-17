import type { Metadata, Viewport } from 'next'
import { Familjen_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a1430',
}

const description =
  'Jemari Sapp is an Atlanta designer for music, brands, and AI products: art director and designer for YoungBoy Never Broke Again releases since 2018, founder of TRISP Studio, and a builder of AI tools.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.jemarisapp.com/'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Jemari Sapp, designer for music, brands & AI products',
    template: '%s | Jemari Sapp',
  },
  description,
  keywords: [
    'Product designer',
    'Brand designer',
    'Album cover design',
    'AI product design',
    'Atlanta designer',
    'Jemari Sapp',
  ],
  authors: [{ name: 'Jemari Sapp', url: 'https://www.jemarisapp.com' }],
  creator: 'Jemari Sapp',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.jemarisapp.com',
    siteName: 'Jemari Sapp',
    title: 'Jemari Sapp, designer for music, brands & AI products',
    description,
    images: [
      {
        url: '/cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Jemari Sapp design portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jemari Sapp, designer for music, brands & AI products',
    description,
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
}

const familjen = Familjen_Grotesk({
  variable: '--font-familjen',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${familjen.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Jemari Sapp',
              url: 'https://www.jemarisapp.com',
              jobTitle: 'Designer',
              description,
              sameAs: ['https://www.linkedin.com/in/jemari-sapp-b3984821b/'],
            }),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
