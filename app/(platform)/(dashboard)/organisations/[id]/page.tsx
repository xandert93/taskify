import { Suspense } from 'react'

import { Separator } from '@/components/ui/separator'

import { BoardHeader } from './_components/BoardHeader'
import { BoardList } from './_components/BoardList'
// import { checkSubscription } from '@/lib/subscription'

export default async function SingleOrganisationPage() {
  // const isPro = await checkSubscription()
  let isPro = false

  return (
    <div className="w-full mb-20">
      <BoardHeader isPro={isPro} />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        {/* 🔥 renders fallback as long as child component has not returned */}
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  )
}
