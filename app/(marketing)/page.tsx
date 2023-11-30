import Link from 'next/link'
import { Rubik } from 'next/font/google'
import { Poppins } from 'next/font/google'
import { Medal } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { PATHS } from '@/constants/path-constants'

const headingFont = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

const textFont = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function MarketingPage() {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 text-center',
        headingFont.className
      )}
    >
      <div className="flex items-center gap-2 px-4 py-2 border shadow-sm rounded-full bg-yellow-100 text-yellow-600 text-lg md:text-xl">
        <Medal className="h-6 w-6" />
        <span>#1 in Task Management</span>
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
        <span className="block mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 text-neutral-800 font-medium">
          Drive your team forward
        </span>
        <span className="inline-block bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-medium rounded-md px-4 py-2">
          with TaskZen
        </span>
      </h1>

      <div
        className={cn(
          'text-sm md:text-xl text-neutral-400 max-w-sm md:max-w-2xl',
          textFont.className
        )}
      >
        <p className="mb-2">Teaming up, project mastery, and peak productivity.</p>
        <p>From offices to home desks, your unique workflow excels with TaskZen.</p>
      </div>
      <Button size="lg" asChild>
        <Link href={PATHS.REGISTER} className="text-lg">
          Get TaskZen for free
        </Link>
      </Button>
    </div>
  )
}
