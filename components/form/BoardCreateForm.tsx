'use client'

import { toast } from 'sonner'

import { useRouter } from 'next/navigation'

import { useServerAction } from '@/hooks/useServerAction'

import { createBoard } from '@/actions/create-board'
// import { useProModal } from '@/hooks/use-pro-modal'

import { FormInput } from './FormInput'
import { SubmitButton } from './SubmitButton'
import { FormPicker } from './FormPicker'
import { RefObject } from 'react'

type Props = {
  closeRef: RefObject<HTMLButtonElement>
}

export const BoardCreateForm = (props: Props) => {
  // const proModal = useProModal()
  const router = useRouter()

  const { execute: mutate, fieldErrors } = useServerAction(createBoard, {
    onSuccess: (data) => {
      toast.success('Board created!')
      props.closeRef.current?.click()
      router.push(`/board/${data.id}`)
    },

    onError: (error) => {
      toast.error(error)
      // proModal.onOpen()
    },
  })

  const handleSubmit = (formData: FormData) => {
    const newBoard = {
      title: formData.get('title') as string,
      image: formData.get('image') as string,
    }

    mutate(newBoard)
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        {/* <FormPicker id="image" errors={fieldErrors} /> */}
        <FormInput id="title" label="Board title" type="text" errors={fieldErrors} />
      </div>
      <SubmitButton className="w-full">Create</SubmitButton>
    </form>
  )
}
