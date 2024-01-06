'use client'

import { toast } from 'sonner'
import { ElementRef, useEffect, useRef, useState } from 'react'
import { Board } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/form/FormInput'

import { useServerAction } from '@/hooks/useServerAction'
import { updateBoardTitle } from '@/actions/update-board-title'

type Props = {
  board: Board
}

export const BoardTitle = ({ board }: Props) => {
  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const [title, setTitle] = useState(board.title)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const openForm = () => {
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
  }

  useEffect(() => {
    if (isFormOpen) {
      const inputEl = inputRef.current! // 🔥 certain that when this code runs, `.current` is not null. Thus, use the non-null assertion operator (!) to inform TS that the value is not null

      inputEl.focus()
      inputEl.select() // 🔥 selects all the text in a <textarea> element or in an <input> element that includes a text field
    }
  }, [isFormOpen])

  const { mutate } = useServerAction(updateBoardTitle, {
    onSuccess: (updatedBoard) => {
      setTitle(updatedBoard.title)
      toast.success(`Board "${updatedBoard.title}" updated!`)
    },
    onError: toast.error,
  })

  const handleSubmit = async (formData: FormData) => {
    const newTitle = formData.get('title') as string

    if (newTitle !== title) {
      await mutate({ id: board.id, title: newTitle })
    }

    closeForm()
  }

  const handleBlur = () => {
    formRef.current?.requestSubmit() // 🔥 formEl.requestSubmit() is a more modern and versatile method that respects HTML5 form validation and event listeners, making it a preferred choice. Yet, in rare event that we want to trigger form submission without validation (or custom event handling), use formEl.submit()
  }

  if (!isFormOpen) {
    // <BoardTitleButton>
    return (
      <Button
        onClick={openForm}
        variant="transparent"
        className="font-bold text-lg h-auto w-auto p-1 px-2"
      >
        {title}
      </Button>
    )
  }

  // <BoardTitleUpdateForm>
  else
    return (
      <form action={handleSubmit} ref={formRef} className="flex items-center gap-x-2">
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={handleBlur}
          defaultValue={title}
          className="text-white text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    )
}
