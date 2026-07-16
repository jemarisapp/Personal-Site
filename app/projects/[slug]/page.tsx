import { notFound } from 'next/navigation'
import {
  CaseStudyHeader,
  CaseStudyImage,
  CaseStudyMediaGallery,
  CaseStudySection,
  ConfidentialityNotice,
  OutcomeBlock,
  ProjectMetadata,
  RelatedProjects,
  TechnologyList,
  WorkflowDiagram,
} from '@/components/case-study/case-study-components'
import {
  CASE_STUDIES,
  getCaseStudy,
  getCaseStudyNavigation,
} from '@/lib/case-studies'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({
    slug: study.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const study = getCaseStudy(slug)

  if (!study) {
    return {}
  }

  return {
    title: `${study.title} Case Study`,
    description: study.summary,
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const study = getCaseStudy(slug)

  if (!study) {
    notFound()
  }

  const navigation = getCaseStudyNavigation(study.slug)
  const mediaTitle =
    study.media?.every((item) => item.type === 'video') ? 'Video' : 'Screenshots and Video'

  return (
    <main className="space-y-10 pb-12">
      <CaseStudyHeader study={study} />

      {study.heroImage ? <CaseStudyImage image={study.heroImage} /> : null}

      <ProjectMetadata items={study.metadata} />

      {study.workflow ? (
        <CaseStudySection title="System at a Glance">
          <WorkflowDiagram steps={study.workflow} />
        </CaseStudySection>
      ) : null}

      {study.media?.length ? (
        <CaseStudySection title={mediaTitle}>
          <CaseStudyMediaGallery media={study.media} />
        </CaseStudySection>
      ) : null}

      {study.sections.map((section) => (
        <CaseStudySection key={section.title} title={section.title}>
          <div className="space-y-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {section.body?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets ? (
              <ul className="space-y-2">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </CaseStudySection>
      ))}

      <CaseStudySection title="Technologies and Capabilities">
        <TechnologyList technologies={study.technologies} />
      </CaseStudySection>

      <OutcomeBlock outcomes={study.outcomes} />

      {study.confidentialityNotice ? (
        <ConfidentialityNotice>
          {study.confidentialityNotice}
        </ConfidentialityNotice>
      ) : null}

      <RelatedProjects previous={navigation.previous} next={navigation.next} />
    </main>
  )
}
