import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { HelpCircleIcon, User2Icon } from 'lucide-react'

import { Tooltip } from '@/components/Tooltip'
import { Skeleton } from '@/components/ui/skeleton'
import { BoardCreateFormPopover } from '@/components/form/BoardCreateFormPopover'

import { paths } from '@/constants/path-constants'

import { BoardLink } from './BoardLink'
import { getOrgBoards } from '@/actions/get-org-boards'
import { NewBoardsRemaining } from './NewBoardsRemaining'

export const BoardList = async () => {
  const { orgId } = auth()

  if (!orgId) return redirect(paths.select_organisation)

  // const boards = await getOrgBoards(orgId)

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2Icon className="h-6 w-6 mr-2" />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* {boards.map((board) => (
          <BoardLink key={board.id} {...board} />
        ))} */}
        <BoardCreateFormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
          >
            <p className="text-sm">Create new board</p>
            {/* <NewBoardsRemaining /> */}
            <NewBoardTooltip />
          </div>
        </BoardCreateFormPopover>
      </div>
    </div>
  )
}

const NewBoardTooltip = () => {
  return (
    <Tooltip
      sideOffset={40}
      description="Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace."
    >
      <HelpCircleIcon className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
    </Tooltip>
  )
}

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  )
}
