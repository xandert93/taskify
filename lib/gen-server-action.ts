import { z } from 'zod'

export type FieldErrors<T> = {
  [K in keyof T]?: string[]
}

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>
  error?: string | null
  data?: TOutput
}

export const genServerAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  const action = async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const result = schema.safeParse(data) // .safeParse does not throw an error, unlike .parse

    const isValid = result.success

    if (!isValid)
      return {
        fieldErrors: result.error.flatten().fieldErrors as FieldErrors<TInput>,
      }

    // Is valid? Call the server action with the validated data ✅
    return handler(result.data)
  }

  return action
}
