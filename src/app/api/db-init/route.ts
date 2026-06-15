import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    
    // Try to query users to force table creation if push is enabled
    await payload.find({
      collection: 'users',
      limit: 1,
    })
    
    return Response.json({ 
      status: 'ok', 
      message: 'Database connection successful',
      collections: ['users', 'media', 'projects'] 
    })
  } catch (error) {
    console.error('DB Init Error:', error)
    return Response.json({ 
      status: 'error', 
      error: error instanceof Error ? error.message : 'Unknown error',
      hint: 'Make sure PAYLOAD_DATABASE_PUSH=true and DATABASE_URI is set'
    }, { status: 500 })
  }
}
