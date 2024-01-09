'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { genServerAction } from '@/lib/gen-server-action'

import { DeleteListSchema } from './schema'
import { InputType, ReturnType } from './types'
// import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return { error: 'Insufficient permissions' }

  const { id, boardId } = data

  try {
    const deletedList = await db.list.delete({
      where: { id, boardId, board: { orgId } },
    })

    // await createAuditLog({
    //   entityTitle: list.title,
    //   entityId: list.id,
    //   entityType: ENTITY_TYPE.LIST,
    //   action: ACTION.DELETE,
    // })

    revalidatePath(`/boards/${boardId}`)
    return { data: deletedList }
  } catch (err) {
    return { error: 'Failed to delete.' }
  }
}

export const deleteList = genServerAction(DeleteListSchema, handler)
