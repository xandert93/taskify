'use client'

import { Menu as MenuIcon } from 'lucide-react'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'

import { useSideNav } from './useSideNav'
import { OrganisationsMenu } from '../OrganisationsMenu'
import { cn } from '@/lib/utils'

export const SideNav = () => {
  const pathname = usePathname()

  const { isOpen, close } = useSideNav()

  useEffect(close, [pathname])

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent side="left" className="p-2 pt-10">
        <OrganisationsMenu lsKey="orgs-menu-mob" />
      </SheetContent>
    </Sheet>
  )
}

type ButtonProps = {
  className?: string
}

export const SideNavButton = (props: ButtonProps) => {
  const { open } = useSideNav()

  return (
    <Button onClick={open} className={cn(props.className)} variant="ghost" size="sm">
      <MenuIcon className="h-4 w-4" />
    </Button>
  )
}
