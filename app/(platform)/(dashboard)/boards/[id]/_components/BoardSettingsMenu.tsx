'use client'

import { toast } from 'sonner'
import { SettingsIcon, XIcon } from 'lucide-react'

import { deleteBoard } from '@/actions/board/delete-board'
import { useServerAction } from '@/hooks/useServerAction'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type Props = {
  id: string
}

export const BoardSettingsMenu = ({ id }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <SettingsIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board Settings
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <BoardDeleteButton id={id} />
      </PopoverContent>
    </Popover>
  )
}

const BoardDeleteButton = ({ id }: Props) => {
  const { mutate, isLoading } = useServerAction(deleteBoard, {
    // ❓ Not sure we can use `onSuccess` toast here, since application redirects to another page?
    onError: toast.error,
  })

  const handleDeleteButtonClick = () => mutate({ id })

  return (
    <Button
      variant="ghost"
      onClick={handleDeleteButtonClick}
      disabled={isLoading}
      className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
    >
      Delete this board
    </Button>
  )
}
