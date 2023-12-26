import { Plus as PlusIcon } from 'lucide-react'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'

import { HomeLogoLink } from '@/components/HomeLogoLink'
import { Button } from '@/components/ui/button'
import { paths } from '@/constants/path-constants'
import { SideNavButton } from './SideNav/SideNav'
import { BoardCreateFormPopover } from '@/components/form/BoardCreateFormPopover'

export const NavBar = () => {
  return (
    <nav className="h-14 md:h-16 px-4 border-b shadow-sm bg-white flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SideNavButton className="block md:hidden" />
        <HomeLogoLink className="hidden md:block" />

        <Button variant="primary" size="sm" className="rounded-sm h-auto py-1.5 px-2">
          <BoardCreateFormPopover align="start" side="bottom" sideOffset={18}>
            <span className="hidden md:block">Create</span>
          </BoardCreateFormPopover>
          <BoardCreateFormPopover>
            <span className="md:hidden">
              <PlusIcon className="h-4 w-4" />
            </span>
          </BoardCreateFormPopover>
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
