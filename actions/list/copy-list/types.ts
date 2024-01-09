import { z } from 'zod'
import { List } from '@prisma/client'

import { ActionState } from '@/lib/gen-server-action'

import { CopyListSchema } from './schema'

export type InputType = z.infer<typeof CopyListSchema>
export type ReturnType = ActionState<InputType, List>
