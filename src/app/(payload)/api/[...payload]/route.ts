import type { NextRequest } from 'next/server'
import { REST_DELETE, REST_GET, REST_PATCH, REST_POST, REST_PUT } from '@payloadcms/next/routes'
import config from '@payload-config'

type RouteContext = { params: Promise<{ payload: string[] }> }
type RouteHandler = (req: NextRequest, ctx: RouteContext) => Promise<Response>

export const GET = REST_GET(config) as unknown as RouteHandler
export const POST = REST_POST(config) as unknown as RouteHandler
export const DELETE = REST_DELETE(config) as unknown as RouteHandler
export const PATCH = REST_PATCH(config) as unknown as RouteHandler
export const PUT = REST_PUT(config) as unknown as RouteHandler
