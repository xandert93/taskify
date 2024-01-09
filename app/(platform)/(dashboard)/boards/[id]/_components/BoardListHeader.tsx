'use client'

import { toast } from 'sonner'
import { List } from '@prisma/client'
import { useEventListener } from 'usehooks-ts'
import { useState, useRef, ElementRef } from 'react'

import { useServerAction } from '@/hooks/useServerAction'
import { updateListTitle } from '@/actions/list/update-list-title'
import { FormInput } from '@/components/form/FormInput'

import { ListSettings } from './ListSettings'

type Props = {
  list: List
  onAddCard: () => void
}

export const BoardListHeader = ({ list, onAddCard }: Props) => {
  const [title, setTitle] = useState(list.title)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const openForm = () => {
    setIsFormOpen(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  const closeForm = () => {
    setIsFormOpen(false)
  }

  const { mutate } = useServerAction(updateListTitle, {
    onSuccess: (updatedList) => {
      toast.success(`Renamed to "${updatedList.title}"`)
      setTitle(updatedList.title)
      closeForm()
    },
    onError: toast.error,
  })

  const handleSubmit = (formData: FormData) => {
    const newTitle = formData.get('title') as string

    if (newTitle === list.title) closeForm()
    else
      mutate({
        title: newTitle,
        id: list.id,
        boardId: list.boardId,
      })
  }

  const handleBlur = () => {
    formRef.current?.requestSubmit()
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return

    formRef.current?.requestSubmit()
  }

  useEventListener('keydown', handleKeyDown)

  const FormToggle = () => (
    <div
      onClick={openForm}
      className="text-sm font-medium border-transparent py-1 h-7 px-2.5"
    >
      {title}
    </div>
  )

  const Form = () => (
    <form ref={formRef} action={handleSubmit} className="flex-1">
      <FormInput
        ref={inputRef}
        onBlur={handleBlur}
        id="title"
        placeholder="Enter list title.."
        defaultValue={title}
        className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
      />
    </form>
  )

  return (
    <div className="flex justify-between items-start pt-2 px-2 text-sm font-semibold">
      {!isFormOpen ? <FormToggle /> : <Form />}
      <ListSettings onAddCard={onAddCard} list={list} />
    </div>
  )
}
