import Link from 'next/link'
import './globals.css'
import { Manrope } from 'next/font/google'
import { LogoHelmet } from '~/icons'
import type { Metadata } from 'next'

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
    <html lang="en" className={`${fontSans.variable} font-sans antialiased`}>
      <body className="tracking-tight">
        {children}
        <footer className="w-full pt-4 pb-6 text-center text-sm text-slate-600">
          <div className="inline-flex items-center">
            <Link
              className="font-bold mr-2 underline text-black/90"
              href={'https://github.com/withyellow/pong'}
            >
              {'"Pong"'}
            </Link>
            is an open source project by
            <Link
              className="ml-2 font-bold text-black/90 inline-flex items-center space-x-1"
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
      </body>
    </html>
  )
}
