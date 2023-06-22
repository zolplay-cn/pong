import Link from 'next/link'
import './globals.css'
import { LogoHelmet } from '~/icons'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { Toaster } from 'sonner'

const fontSans = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
})

const title = 'Pong'
const description =
  'Pong: The ultimate edge network speed test for your website'
export const metadata = {
  title,
  description,
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://pong.zol.ai'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title,
    description,
    type: 'website',
    url: 'https://pong.zol.ai',
    siteName: 'Pong, Powered by Zolplay',
  },
  twitter: {
    site: '@zolplay',
    creator: '@zolplay',
    card: 'summary_large_image',
    title,
    description,
  },
} satisfies Metadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} bg-zinc-100 font-sans antialiased dark:bg-zinc-900`}
    >
      <body className="min-w-min tracking-tight">
        <main className="mx-auto max-w-5xl px-4 md:pb-16">{children}</main>
        <footer className="w-full pb-6 pt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
          <div className="inline-flex items-center">
            <Link
              className="mr-2 font-bold text-zinc-900/90 underline dark:text-zinc-100"
              href={'https://github.com/withyellow/pong'}
            >
              {'"Pong"'}
            </Link>
            is an open source project by
            <Link
              className="ml-2 inline-flex items-center space-x-1 font-bold text-zinc-900/90 dark:text-zinc-100"
              href={
                'https://zolplay.com/?utm_source=pong&utm_medium=footer&utm_campaign=pong'
              }
            >
              <LogoHelmet />
              <span>Zolplay</span>
            </Link>
            .
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  )
}
