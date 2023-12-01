import type { Metadata } from 'next'
import './globals.css'
import { fonts } from '@/constants/font-constants'

export const metadata: Metadata = {
  title: 'TaskZen',
  description:
    'Organise tasks effortlessly with intuitive boards, lists, and cards for seamless collaboration.',
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
