import type { MetadataRoute } from 'next'
import { WORK } from '@/lib/work'

const BASE = 'https://www.jemarisapp.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/home', '/work', '/ai', '/about', '/resume', '/resume/ai', '/contact', ...WORK.map((w) => `/work/${w.slug}`)]
  return pages.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' || route === '/home' ? 1 : 0.7,
  }))
}
