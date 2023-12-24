import { XCircleIcon } from 'lucide-react'

interface Props {
  id: string
  errors?: Record<string, string[] | undefined>
}

export const FormErrors = ({ id, errors: messages }: Props) => {
  if (!messages) return null

  return (
    <div id={`${id}-error`} aria-live="polite" className="mt-2 text-xs text-rose-500">
      {messages?.[id]?.map((message: string) => (
        <ErrorMessage key={message} message={message} />
      ))}
    </div>
  )
}

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm">
      <XCircleIcon className="h-4 w-4 mr-2" />
      {message}
    </div>
  )
}
