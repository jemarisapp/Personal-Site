import type { MetadataRoute } from 'next'
import { WEBSITE_URL } from '@/lib/constants'
import { CASE_STUDIES } from '@/lib/case-studies'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = WEBSITE_URL

    const allPages = [
        '',
        '/projects',
        ...CASE_STUDIES.map((study) => `/projects/${study.slug}`),
    ]

    return allPages.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
    }))
}
