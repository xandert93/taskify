import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { paths } from '@/constants/path-constants'
import { site } from '@/config/site-config'
import { fonts } from '@/constants/font-constants'

export const Logo = () => {
  return (
    <Link href={paths.home} className="hidden md:block">
      <div className="flex items-center gap-2 hover:opacity-75 transition">
        <Image src="/logo.gif" alt="Logo" height={32} width={32} />
        <p className={cn('text-lg text-neutral-700', fonts.heading.className)}>
          {site.name}
        </p>
      </div>
    </Link>
  )
}
