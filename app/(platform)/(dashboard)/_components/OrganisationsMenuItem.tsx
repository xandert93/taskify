'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Activity, CreditCard, Layout, LucideIcon, Settings } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

export type Organisation = {
  id: string
  name: string
  slug: string
  imageUrl: string
}

interface Props {
  isExpanded: boolean
  isActive: boolean
  organisation: Organisation
  handleExpand: (id: string) => () => void
}

export const OrganisationsMenuItem = ({
  isExpanded,
  isActive,
  organisation: org,
  handleExpand,
}: Props) => {
  const routes = [
    {
      label: 'Boards',
      Icon: Layout,
      href: `/organisations/${org.id}`,
    },
    {
      label: 'Activity',
      Icon: Activity,
      href: `/organisations/${org.id}/activity`,
    },
    {
      label: 'Settings',
      Icon: Settings,
      href: `/organisations/${org.id}/settings`,
    },
    {
      label: 'Billing',
      Icon: CreditCard,
      href: `/organisations/${org.id}/billing`,
    },
  ]

  return (
    <AccordionItem value={org.id} className="border-none">
      <AccordionTrigger
        onClick={handleExpand(org.id)}
        className={cn(
          'flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline',
          isActive && !isExpanded && 'bg-sky-500/10 text-sky-700'
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <Image
              fill
              src={org.imageUrl}
              alt="organisation"
              className="rounded-sm object-cover"
            />
          </div>
          <span className="font-medium text-sm">{org.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => (
          <OrganisationSubPageLink key={route.label} {...route} />
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}

const OrganisationSubPageLink = ({
  label,
  Icon,
  href,
}: {
  label: string
  Icon: LucideIcon
  href: string
}) => {
  const pathname = usePathname()

  return (
    <Button
      key={label}
      asChild
      size="sm"
      className={cn(
        'w-full font-normal justify-start pl-10 mb-1',
        pathname === href && 'bg-sky-500/10 text-sky-700'
      )}
      variant="ghost"
    >
      <Link href={href}>
        <Icon className="h-4 w-4 mr-2" />
        {label}
      </Link>
    </Button>
  )
}

export const OrganisationsMenuItemSkeleton = () => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  )
}
