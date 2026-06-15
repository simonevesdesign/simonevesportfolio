import { getPayload } from 'payload'
import config from '@payload-config'
import { projects } from './lib/projects'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding projects...')

  const existing = await payload.find({ collection: 'projects', limit: 1 })
  if (existing.totalDocs > 0) {
    console.log('Projects already seeded — skipping.')
    process.exit(0)
  }

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i]
    await payload.create({
      collection: 'projects',
      data: {
        title: p.title,
        slug: p.slug,
        hasDetail: p.hasDetail,
        index: p.index,
        type: p.type,
        category: p.category,
        description: p.description,
        tags: p.tags.map((tag) => ({ tag })),
        filterTags: p.filterTags.map((tag) => ({ tag })),
        link: p.link,
        linkText: p.linkText,
        year: p.year,
        span: String(p.span),
        thumbLabel: p.thumbLabel,
        sortOrder: i + 1,
      },
    })
    console.log(`✓ Created: ${p.title}`)
  }

  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
