import { getPayload } from 'payload'
import type { Project } from '@/payload-types'

let payloadPromise: ReturnType<typeof getPayload> | null = null

async function getPayloadClient() {
  if (!payloadPromise) {
    const { default: config } = await import('@payload-config')
    payloadPromise = getPayload({ config })
  }
  return payloadPromise
}

export async function getProjects(): Promise<Project[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      limit: 100,
      sort: 'sortOrder',
    })
    return result.docs as Project[]
  } catch {
    return []
  }
}
