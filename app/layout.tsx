import type { Metadata } from 'next'
import './globals.css'
import { fonts } from '@/constants/font-constants'
import { site } from '@/config/site-config'

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`, // 🔥 if a page doesn't specify a dynamic template `title` via generateMetadata (gets inserted in place of $s placeholder), then the default above is used
  },
  description: site.description,
  icons: [
    {
      url: '/logo.svg',
      href: '/logo.svg',
    },
  ],
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={fonts.text.className}>{children}</body>
    </html>
  )
}
