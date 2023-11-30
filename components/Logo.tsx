import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { Rubik } from 'next/font/google'
import { PATHS } from '@/constants/path-constants'

const headingFont = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const Logo = () => {
  return (
    <Link href={PATHS.HOME} className="hidden md:block">
      <div className="flex items-center gap-2 hover:opacity-75 transition">
        <Image src="/logo.svg" alt="Logo" height={32} width={32} />
        <p className={cn('text-lg text-neutral-700', headingFont.className)}>TaskZen</p>
      </div>
    </Link>
  )
}
