'use client'

import { FormInput } from '@/components/form/FormInput'
import { SubmitButton } from '@/components/form/SubmitButton'
import { Button } from '@/components/ui/button'
import { FieldErrors } from '@/lib/gen-server-action'
import { XIcon } from 'lucide-react'
import { ElementRef } from 'react'

type Props = {
  closeForm: () => void
  handleSubmit: (formData: FormData) => void
  inputRef: React.RefObject<ElementRef<'input'>>
  formRef: React.RefObject<ElementRef<'form'>>
  fieldErrors: any
}

export const BoardListCreateForm = ({
  closeForm,
  handleSubmit,
  formRef,
  inputRef,
  fieldErrors,
}: Props) => {
  return (
    <form
      action={handleSubmit}
      ref={formRef}
      className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
    >
      <FormInput
        ref={inputRef}
        errors={fieldErrors}
        id="title"
        className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
        placeholder="Enter your list's title..."
      />
      <div className="flex items-center gap-x-1">
        <SubmitButton>Create!</SubmitButton>
        <Button onClick={closeForm} size="sm" variant="ghost">
          <XIcon className="h-5 w-5" />
        </Button>
      </div>
    </form>
  )
}
