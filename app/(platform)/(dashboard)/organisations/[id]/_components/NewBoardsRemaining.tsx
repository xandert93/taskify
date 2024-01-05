import { freeBoardCount } from '@/constants/app-constants'
import { getAvailableCount } from '@/lib/org-limit'
import { checkSubscription } from '@/lib/subscription'

export const NewBoardsRemaining = async () => {
  // const availableCount = await getAvailableCount()
  // const isPro = await checkSubscription()

  let availableCount = 5
  let isPro = false

  return (
    <span className="text-xs">
      {isPro ? 'Unlimited' : `${freeBoardCount - availableCount} remaining`}
    </span>
  )
}
