'use client'

import { toast } from 'sonner'
import { PlusIcon, XIcon } from 'lucide-react'
import { forwardRef, useRef, ElementRef, KeyboardEventHandler, useEffect } from 'react'
import { useOnClickOutside, useEventListener } from 'usehooks-ts'

import { useServerAction } from '@/hooks/useServerAction'
import { createCard } from '@/actions/card/create-card'
import { Button } from '@/components/ui/button'
import { SubmitButton } from '@/components/form/SubmitButton'
import { FormTextArea } from '@/components/form/FormTextArea'
import { List } from '@prisma/client'

type Props = {
  list: List
  isFormOpen: boolean
  openForm: () => void
  closeForm: () => void
}

export const TaskCreateForm = forwardRef<HTMLTextAreaElement, Props>(
  (props, textAreaRef) => {
    const { list, isFormOpen, openForm, closeForm } = props

    const formRef = useRef<ElementRef<'form'>>(null)

    const { mutate, fieldErrors } = useServerAction(createCard, {
      onSuccess: (savedCard) => {
        closeForm()
        toast.success(`"${savedCard.title}" added to ${list.title}!`)
      },
      onError: toast.error,
    })

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      closeForm()
    }

    useOnClickOutside(formRef, closeForm)
    useEventListener('keydown', handleKeyDown)

    const handleTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        formRef.current?.requestSubmit()
      }
    }

    const handleSubmit = (formData: FormData) => {
      mutate({
        title: formData.get('title') as string,
        listId: list.id,
        boardId: list.boardId,
      })
    }

    if (!isFormOpen) {
      return (
        <div className="pt-2 px-2">
          <Button
            onClick={openForm}
            className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
            size="sm"
            variant="ghost"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add a card
          </Button>
        </div>
      )
    } else {
      return (
        <form ref={formRef} action={handleSubmit} className="m-1 py-0.5 px-1 space-y-4">
          <FormTextArea
            id="title"
            onKeyDown={handleTextAreaKeyDown}
            ref={textAreaRef}
            placeholder="Enter your task's title..."
            errors={fieldErrors}
          />
          <div className="flex items-center gap-x-1">
            <SubmitButton>Add card</SubmitButton>
            <Button onClick={closeForm} size="sm" variant="ghost">
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
        </form>
      )
    }
  }
)

TaskCreateForm.displayName = 'TaskCreateForm' // 🔥 When you inspect the component hierarchy using React DevTools, you will see this name associated with the component, making it easier to identify in the developer tools. Additionally, if there are any errors or warnings related to this component in the console, having a displayName can help you quickly identify which component is causing the issue. In general, setting displayName is a good practice, especially in larger applications where components may be deeply nested. It makes it easier for developers to understand the structure of the component tree and can be particularly helpful in debugging and maintaining the codebase.
