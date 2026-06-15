import '@payloadcms/next/css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { RootLayout as PayloadRootLayout, metadata as payloadMetadata } from '@payloadcms/next/layouts'
import { handleServerFunctions } from '@payloadcms/next/layouts'
import type { ServerFunctionClient, ServerFunctionClientArgs } from 'payload/dist/admin/functions'
import { importMap } from './admin/importMap'

export const metadata: Metadata = payloadMetadata

const configPromise = import('@payload-config').then((mod) => mod.default)

const serverFunctionClient: ServerFunctionClient = async (args: ServerFunctionClientArgs) => {
  'use server'

  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}

export default function PayloadLayout({ children }: { children: ReactNode }) {
  return (
    <PayloadRootLayout
      config={configPromise}
      importMap={importMap}
      serverFunction={serverFunctionClient}
    >
      {children}
    </PayloadRootLayout>
  )
}
