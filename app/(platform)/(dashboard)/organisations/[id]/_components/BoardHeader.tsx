'use client'

import Image from 'next/image'
import { CreditCardIcon } from 'lucide-react'
import { useOrganization } from '@clerk/nextjs'

import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  isPro: boolean
}

export const BoardHeader = ({ isPro }: Props) => {
  const { organization: org, isLoaded } = useOrganization()

  if (!isLoaded) return <BoardHeader.Skeleton />

  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Image
          fill
          src={org?.imageUrl!}
          alt="Organization"
          className="rounded-md object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-xl">{org?.name}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCardIcon className="h-3 w-3 mr-1" />
          {isPro ? 'Pro' : 'Free'}
        </div>
      </div>
    </div>
  )
}

BoardHeader.Skeleton = function SkeletonBoardHeader() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Skeleton className="w-full h-full absolute" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-[200px]" />
        <div className="flex items-center">
          <Skeleton className="h-4 w-4 mr-2" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  )
}
