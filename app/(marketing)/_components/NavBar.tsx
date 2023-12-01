import Link from 'next/link'

import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { paths } from '@/constants/path-constants'

export const NavBar = () => {
  return (
    <header className="flex items-center h-14 lg:h-16 px-4 border-b shadow-sm bg-white">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="outline" asChild>
            <Link href={paths.login}>Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={paths.register}>Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
