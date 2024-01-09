'use client'

import { toast } from 'sonner'
import { List } from '@prisma/client'
import { ElementRef, useRef } from 'react'
import { Copy, MoreHorizontalIcon, XIcon } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover'
import { useServerAction } from '@/hooks/useServerAction'
import { Button } from '@/components/ui/button'
import { copyList } from '@/actions/list/copy-list'
import { deleteList } from '@/actions/list/delete-list'
import { SubmitButton } from '@/components/form/SubmitButton'
import { Separator } from '@/components/ui/separator'

interface Props {
  list: List
  openTaskCreateForm: () => void
}

export const BoardListSettings = ({ list, openTaskCreateForm }: Props) => {
  const closeButtonRef = useRef<ElementRef<'button'>>(null)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto" variant="ghost">
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Actions
        </div>
        <PopoverClose ref={closeButtonRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          onClick={openTaskCreateForm}
        >
          Add task
        </Button>
        <CopyListButton list={list} closeButtonRef={closeButtonRef} />
        <DeleteListButton list={list} closeButtonRef={closeButtonRef} />
        <Separator />
      </PopoverContent>
    </Popover>
  )
}

// 🔥 done two different approaches to server action call - as a <form> action and as a <button> onClick. Latter is less hacky (to me), but have to manage isLoading state manually, whereas in first, <SubmitButton> is configured to read it from useFormStatus().isPending...
// 🔥 wonder what performance difference is between two? Progressive enhancement?

type CreDelButtonProps = {
  list: List
  closeButtonRef: React.RefObject<ElementRef<'button'>>
}

const CopyListButton = ({ list, closeButtonRef }: CreDelButtonProps) => {
  const { mutate } = useServerAction(copyList, {
    onSuccess: (savedListCopy) => {
      toast.success(`"${list.title}" list copied!`)
      closeButtonRef.current?.click()
    },
    onError: toast.error,
  })

  const handleCopySubmit = () => {
    mutate({ id: list.id, boardId: list.boardId })
  }

  return (
    <form action={handleCopySubmit}>
      <SubmitButton
        variant="ghost"
        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
      >
        Create Copy
      </SubmitButton>
    </form>
  )
}

const DeleteListButton = ({ list, closeButtonRef }: CreDelButtonProps) => {
  const { mutate, isLoading } = useServerAction(deleteList, {
    onSuccess: (deletedList) => {
      toast.success(`"${deletedList.title}" list deleted`)
      closeButtonRef.current?.click()
    },
    onError: toast.error,
  })

  const handleClick = () => {
    mutate({ id: list.id, boardId: list.boardId })
  }

  return (
    <Button
      variant="ghost"
      className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
      onClick={handleClick}
      disabled={isLoading}
    >
      Delete
    </Button>
  )
}
