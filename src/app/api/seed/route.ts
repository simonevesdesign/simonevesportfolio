import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { projects } from '@/lib/projects'

export async function POST(req: NextRequest) {
  const body = await req.json() as { secret?: string; force?: boolean }
  const { secret, force } = body

  if (!secret || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const payload = await getPayload({ config })

  const existing = await payload.find({ collection: 'projects', limit: 1 })

  if (existing.totalDocs > 0 && !force) {
    return NextResponse.json({ seeded: 0, skipped: true, existing: existing.totalDocs })
  }

  if (force && existing.totalDocs > 0) {
    const all = await payload.find({ collection: 'projects', limit: 1000 })
    for (const doc of all.docs) {
      await payload.delete({ collection: 'projects', id: doc.id })
    }
  }

  let seeded = 0
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
        span: String(p.span) as '8' | '6' | '4',
        thumbLabel: p.thumbLabel,
        sortOrder: i + 1,
      },
    })
    seeded++
  }

  return NextResponse.json({ seeded, skipped: false })
}
