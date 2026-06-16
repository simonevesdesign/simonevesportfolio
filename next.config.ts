import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

type NMRPluginCtor = new (
  resourceRegExp: RegExp,
  newResource: (resource: { request: string }) => void,
) => object

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['pino', 'pino-pretty'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins = config.plugins ?? []
      const { NormalModuleReplacementPlugin } = require('webpack') as {
        NormalModuleReplacementPlugin: NMRPluginCtor
      }
      config.plugins.push(
        new NormalModuleReplacementPlugin(/^node:/, (resource) => {
          resource.request = resource.request.replace(/^node:/, '')
        }),
      )
      config.resolve = config.resolve ?? {}
      config.resolve.fallback = {
        ...config.resolve.fallback,
        worker_threads: false,
        assert: false,
        buffer: false,
        child_process: false,
        crypto: false,
        events: false,
        fs: false,
        http: false,
        https: false,
        console: false,
        dns: false,
        net: false,
        os: false,
        path: false,
        process: false,
        async_hooks: false,
        diagnostics_channel: false,
        readline: false,
        stream: false,
        string_decoder: false,
        timers: false,
        tls: false,
        url: false,
        util: false,
        'util/types': false,
        zlib: false,
        sqlite: false,
        constants: false,
        dgram: false,
        domain: false,
        http2: false,
        module: false,
        perf_hooks: false,
        punycode: false,
        querystring: false,
        repl: false,
        tty: false,
        v8: false,
        vm: false,
      }
      const alias = config.resolve.alias as Record<string, string | false | string[]> | undefined
      config.resolve.alias = {
        ...alias,
        'node:worker_threads': false,
        'node:assert': false,
        'node:buffer': false,
        'node:child_process': false,
        'node:crypto': false,
        'node:events': false,
        'node:fs': false,
        'node:http': false,
        'node:https': false,
        'node:console': false,
        'node:dns': false,
        'node:net': false,
        'node:os': false,
        'node:path': false,
        'node:process': false,
        'node:async_hooks': false,
        'node:diagnostics_channel': false,
        'node:readline': false,
        'node:stream': false,
        'node:string_decoder': false,
        'node:timers': false,
        'node:tls': false,
        'node:url': false,
        'node:util': false,
        'util/types': false,
        'node:util/types': false,
        'node:zlib': false,
        'node:sqlite': false,
        'node:constants': false,
        'node:dgram': false,
        'node:domain': false,
        'node:http2': false,
        'node:module': false,
        'node:perf_hooks': false,
        'node:punycode': false,
        'node:querystring': false,
        'node:repl': false,
        'node:tty': false,
        'node:v8': false,
        'node:vm': false,
        'file-type': false,
      }
    }
    return config
  },
}

export default withPayload(nextConfig)
