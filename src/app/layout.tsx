import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'
import { LogoHelmet } from '~/icons'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pong',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
              className="ml-2 font-bold text-black/90 inline-flex items-center"
              href={'https://zolplay.com'}
            >
              <LogoHelmet /> Zolplay
            </Link>
            .
          </div>
        </footer>
      </body>
    </html>
  )
}
