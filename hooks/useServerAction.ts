import { useState, useCallback } from 'react'

import { ActionState, FieldErrors } from '@/lib/gen-server-action'

type Action<TInput, TOutput> = (data: TInput) => Promise<ActionState<TInput, TOutput>>

interface Options<TOutput> {
  onSuccess?: (data: TOutput) => void
  onError?: (error: string) => void
  onComplete?: () => void
}

// similar to TSQ's useMutation hook

export const useServerAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: Options<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput> | undefined>(
    undefined
  )
  const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState<TOutput | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const mutate = useCallback(
    async (input: TInput) => {
      setIsLoading(true)

      try {
        const result = await action(input)
        if (!result) return // something went wrong out of our reach

        setFieldErrors(result.fieldErrors)

        if (result.error) {
          // if server error
          setErrorMessage(result.error)
          options.onError?.(result.error)
        }

        if (result.data) {
          setData(result.data)
          options.onSuccess?.(result.data)
        }
      } finally {
        setIsLoading(false)
        options.onComplete?.()
      }
    },
    [action, options]
  )

  return {
    mutate,
    data,
    isLoading,
    fieldErrors,
    errorMessage,
  }
}
