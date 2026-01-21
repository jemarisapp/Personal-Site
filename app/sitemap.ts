import type { MetadataRoute } from 'next'
import { WEBSITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = WEBSITE_URL

    // Static pages
    const staticPages = [
        '',
        '/about',
    ]

    // Project pages
    const projectPages = [
        '/project/autonomous-booking-system',
        '/project/camp-moda',
        '/project/fast-x-soundtrack',
        '/project/motion-primitives',
        '/project/motion-primitives-pro',
        '/project/music-industry-analytics',
        '/project/navigate-idd',
        '/project/trilo',
    ]

    // Blog pages
    const blogPages = [
        '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    ]

    const allPages = [...staticPages, ...projectPages, ...blogPages]

    return allPages.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : route.startsWith('/project') ? 0.8 : 0.6,
    }))
}
