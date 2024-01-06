import { z } from 'zod'
import { Board } from '@prisma/client'

import { ActionState } from '@/lib/gen-server-action'

import { UpdateBoardTitleSchema } from './schema'

export type InputType = z.infer<typeof UpdateBoardTitleSchema>
export type ReturnType = ActionState<InputType, Board>
