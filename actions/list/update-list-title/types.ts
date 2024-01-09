import { z } from 'zod'
import { List } from '@prisma/client'

import { ActionState } from '@/lib/gen-server-action'

import { UpdateListTitleSchema } from './schema'

export type InputType = z.infer<typeof UpdateListTitleSchema>
export type ReturnType = ActionState<InputType, List>
