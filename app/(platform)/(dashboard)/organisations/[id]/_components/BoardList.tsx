import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { User2Icon } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'
import { BoardCreateFormPopover } from '@/components/form/BoardCreateFormPopover'

import { paths } from '@/constants/path-constants'

import { BoardPreviewLink } from './BoardPreviewLink'
import { getOrgBoards } from '@/actions/board/get-org-boards'
import { NewBoardsRemaining } from './NewBoardsRemaining'
import { NewBoardTooltip } from './NewBoardTooltip'

export const BoardList = async () => {
  const { orgId } = auth()
  if (!orgId) return redirect(paths.select_organisation)

  const boards = await getOrgBoards(orgId)

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2Icon className="h-6 w-6 mr-2" />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <BoardPreviewLink key={board.id} {...board} />
        ))}
        <BoardCreateFormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm p-1 text-center flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
          >
            <p className="text-sm">Create new board</p>
            <NewBoardsRemaining />
            <NewBoardTooltip />
          </div>
        </BoardCreateFormPopover>
      </div>
    </div>
  )
}

BoardList.Skeleton = function BoardListSkeleton() {
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
