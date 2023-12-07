'use client'

import Link from 'next/link'
import { Plus as PlusIcon } from 'lucide-react'
import { useLocalStorage } from 'usehooks-ts'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Accordion } from '@/components/ui/accordion'
import { paths } from '@/constants/path-constants'

import { OrganisationsMenuItem, Organisation } from './OrganisationsMenuItem'

interface Props {
  lsKey: string
}

export const OrganisationsMenu = ({ lsKey }: Props) => {
  const [orgIdToIsExpandedMap, setOrgIdToIsExpandedMap] = useLocalStorage<
    Record<string, any>
  >(lsKey, {})

  const { organization: activeOrg, isLoaded: hasActiveOrgLoaded } = useOrganization()

  const { userMemberships: usersOrgs, isLoaded: haveUsersOrgsLoaded } =
    useOrganizationList({
      userMemberships: { infinite: true },
    })

  const expandedOrgIds: string[] = Object.keys(orgIdToIsExpandedMap).reduce(
    (acc: string[], id: string) => {
      const isExpanded = orgIdToIsExpandedMap[id]
      if (isExpanded) acc.push(id)
      return acc
    },
    []
  )

  const handleExpand = (id: string) => () => {
    setOrgIdToIsExpandedMap((prev) => ({ ...prev, [id]: !orgIdToIsExpandedMap[id] }))
  }

  const isLoading = !hasActiveOrgLoaded || !haveUsersOrgsLoaded

  if (isLoading) return <SideNavSkeleton />
  else
    return (
      <>
        <SideNavHeading />
        <Accordion type="multiple" defaultValue={expandedOrgIds} className="space-y-2">
          {usersOrgs.data?.map(({ organization: org }) => (
            <OrganisationsMenuItem
              key={org.id}
              isActive={activeOrg?.id === org.id}
              isExpanded={orgIdToIsExpandedMap[org.id]}
              organisation={org as Organisation}
              handleExpand={handleExpand}
            />
          ))}
          <Separator />
        </Accordion>
      </>
    )
}

const SideNavSkeleton = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-10 w-[50%]" />
        <Skeleton className="h-10 w-10" />
      </div>
      <div className="space-y-2">
        <OrganisationsMenuItem.Skeleton />
        <OrganisationsMenuItem.Skeleton />
        <OrganisationsMenuItem.Skeleton />
      </div>
    </>
  )
}

const SideNavHeading = () => {
  return (
    <div className="font-semibold text-sm flex items-center mb-1">
      <span className="pl-4">Workspaces</span>
      <Button asChild size="icon" variant="ghost" className="ml-auto">
        <Link href={paths.select_organisation}>
          <PlusIcon className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}
