import Link from 'next/link'
import { Medal as MedalIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { paths } from '@/constants/path-constants'
import { fonts } from '@/constants/font-constants'

export default function MarketingPage() {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 text-center',
        fonts.heading.className
      )}
    >
      <div className="flex items-center gap-2 px-4 py-3 border shadow-sm rounded-full bg-yellow-100 text-yellow-600 text-lg md:text-xl">
        <MedalIcon className="h-6 w-6" />
        <span>#1 in Task Management</span>
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium">
        <span className="block mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 text-neutral-800">
          Drive your team forward
        </span>
        <span className="inline-block bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white rounded-md px-4 py-2">
          with TaskZen
        </span>
      </h1>

      <div className="text-sm md:text-xl text-neutral-400 max-w-sm md:max-w-2xl">
        <p className="mb-2">Teaming up, project mastery, and peak productivity.</p>
        <p>From offices to home desks, your unique workflow excels with TaskZen.</p>
      </div>
      <Button size="lg" asChild>
        <Link href={paths.register} className="text-lg">
          Try TaskZen for free
        </Link>
      </Button>
    </div>
  )
}
