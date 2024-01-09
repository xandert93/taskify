'use client'

import { toast } from 'sonner'
import { List } from '@prisma/client'
import { ElementRef, useRef } from 'react'
import { MoreHorizontal, X } from 'lucide-react'

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
  onAddCard: () => void
}

export const ListSettings = ({ list, onAddCard }: Props) => {
  const closeRef = useRef<ElementRef<'button'>>(null)

  const { mutate: executeDelete } = useServerAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted`)
      closeRef.current?.click()
    },
    onError: toast.error,
  })

  const { mutate: executeCopy } = useServerAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" copied`)
      closeRef.current?.click()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const handleDelete = (formData: FormData) => {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string

    executeDelete({ id, boardId })
  }

  const handleCopy = (formData: FormData) => {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string

    executeCopy({ id, boardId })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Add card...
        </Button>
        <form action={handleCopy}>
          <input hidden name="id" id="id" value={list.id} />
          <input hidden name="boardId" id="boardId" value={list.boardId} />
          <SubmitButton
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy list...
          </SubmitButton>
        </form>
        <Separator />
        <form action={handleDelete}>
          <input hidden name="id" id="id" value={list.id} />
          <input hidden name="boardId" id="boardId" value={list.boardId} />
          <SubmitButton
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete this list
          </SubmitButton>
        </form>
      </PopoverContent>
    </Popover>
  )
}
