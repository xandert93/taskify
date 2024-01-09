import { useState, useCallback } from 'react'

import { ActionState, FieldErrors } from '@/lib/gen-server-action'

type Action<TArg, TOutput> = (arg: TArg) => Promise<ActionState<TArg, TOutput>>

interface Opts<TOutput> {
  onSuccess?: (data: TOutput) => void
  onError?: (err: string) => void
  onComplete?: () => void
}

// similar to TSQ's useMutation hook

export const useServerAction = <TArg, TOutput>(
  action: Action<TArg, TOutput>,
  opts: Opts<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TArg> | undefined>(undefined)
  const [errMessage, setErrMessage] = useState('')
  const [data, setData] = useState<TOutput | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const mutate = useCallback(
    async (arg: TArg) => {
      setIsLoading(true)

      try {
        const result = await action(arg)
        if (!result) return // something went wrong out of our reach

        setFieldErrors(result.fieldErrors)

        if (result.error) {
          // if server error
          setErrMessage(result.error)
          opts.onError?.(result.error)
        }

        if (result.data) {
          setData(result.data)
          opts.onSuccess?.(result.data)
        }
      } finally {
        setIsLoading(false)
        opts.onComplete?.()
      }
    },
    [action, opts]
  )

  return {
    mutate,
    data,
    isLoading,
    fieldErrors,
    errMessage,
  }
}
