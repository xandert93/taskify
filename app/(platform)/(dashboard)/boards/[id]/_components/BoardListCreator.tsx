'use client'

import { toast } from 'sonner'
import { useParams, useRouter } from 'next/navigation'
import { useState, useRef, ElementRef, useEffect } from 'react'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { useServerAction } from '@/hooks/useServerAction'
import { createList } from '@/actions/list/create-list'

import { BoardListCreateForm } from './BoardListCreateForm'
import { BoardListCreateFormToggle } from './BoardListCreateFormToggle'

export const BoardListCreator = () => {
  const router = useRouter()
  const params = useParams()

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const [isFormOpen, setIsFormOpen] = useState(false)

  const showForm = () => setIsFormOpen(true)
  const closeForm = () => setIsFormOpen(false)

  useEffect(() => {
    if (!isFormOpen) return

    const inputEl = inputRef.current!
    inputEl.focus()
  }, [isFormOpen])

  const { mutate, fieldErrors } = useServerAction(createList, {
    onSuccess: (savedList) => {
      toast.success(`List "${savedList.title}" created`)
      closeForm()
      router.refresh()
    },
    onError: toast.error,
  })

  const handleKeyDown = (e: KeyboardEvent) => {
    e.key === 'Escape' && closeForm()
  }

  useEventListener('keydown', handleKeyDown)
  useOnClickOutside(formRef, closeForm)

  const handleSubmit = (formData: FormData) => {
    mutate({
      boardId: params.id as string,
      title: formData.get('title') as string,
    })
  }

  return (
    <div className="shrink-0 w-72">
      {!isFormOpen ? (
        <BoardListCreateFormToggle showForm={showForm} />
      ) : (
        <BoardListCreateForm
          closeForm={closeForm}
          handleSubmit={handleSubmit}
          inputRef={inputRef}
          formRef={formRef}
          fieldErrors={fieldErrors}
        />
      )}
    </div>
  )
}
