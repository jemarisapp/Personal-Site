import type { MetadataRoute } from 'next'
import { WEBSITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = WEBSITE_URL

    const allPages = ['']

    return allPages.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
    }))
}
