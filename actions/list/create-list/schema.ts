import { z } from 'zod'

export const CreateListSchema = z.object({
  boardId: z.string(),
  title: z
    .string({
      required_error: 'Please provide a title',
      invalid_type_error: 'Please provide a title',
    })
    .min(3, {
      message: 'That title is too short',
    }),
})
