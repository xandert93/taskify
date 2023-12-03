import { Plus as PlusIcon } from 'lucide-react'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'

import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { paths } from '@/constants/path-constants'

export const NavBar = () => {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 md:h-16 border-b shadow-sm bg-white flex items-center justify-between">
      {/* <SideNavigation /> */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex">
          <Logo />
        </div>

        <Button variant="primary" size="sm" className="rounded-sm h-auto py-1.5 px-2">
          <span className="hidden md:block">Create</span>
          <span className="md:hidden">
            <PlusIcon className="h-4 w-4" />
          </span>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl={paths.single_organisation}
          afterSelectOrganizationUrl={paths.single_organisation}
          afterLeaveOrganizationUrl={paths.select_organisation}
          appearance={{
            elements: {
              rootBox: 'flex justify-center items-center',
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: 'h-8 w-8 md:h-9 md:w-9',
            },
          }}
        />
      </div>
    </nav>
  )
}
