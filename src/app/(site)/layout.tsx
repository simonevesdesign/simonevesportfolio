import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Geist, Geist_Mono, Schibsted_Grotesk } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { CursorFollower } from '@/components/CursorFollower'
import { ScrollReveal } from '@/components/ScrollReveal'
import '../globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  weight: ['400', '500'],
  display: 'swap',
})

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Simon Eves | Developer & Designer',
  description:
    'Full-stack developer and designer based in Southend-on-Sea, Essex. Building platforms, products and brands at Flomedia.',
  openGraph: {
    title: 'Simon Eves | Developer & Designer',
    description: 'Full-stack developer and designer based in Southend-on-Sea, Essex.',
    type: 'website',
  },
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${schibstedGrotesk.variable}`}
    >
      <body>
        <ThemeProvider>
          {children}
          <ScrollReveal />
          <CursorFollower />
        </ThemeProvider>
      </body>
    </html>
  )
}
