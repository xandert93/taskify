import { z } from 'zod'
import { Board } from '@prisma/client'

import { ActionState } from '@/lib/gen-server-action'

import { CreateBoardSchema } from './schema'

export type NewBoard = z.infer<typeof CreateBoardSchema>
export type ReturnType = ActionState<NewBoard, Board>
