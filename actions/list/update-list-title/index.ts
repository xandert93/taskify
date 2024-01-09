'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { genServerAction } from '@/lib/gen-server-action'

import { UpdateListTitleSchema } from './schema'
import { InputType, ReturnType } from './types'
// import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) return { error: 'Insufficient permissions' }

  const { title, id, boardId } = data

  try {
    const updatedList = await db.list.update({
      where: { id, boardId, board: { orgId } },
      data: { title },
    })

    // await createAuditLog({
    //   entityTitle: updatedList.title,
    //   entityId: updatedList.id,
    //   entityType: ENTITY_TYPE.CARD,
    //   action: ACTION.UPDATE,
    // })

    revalidatePath(`/boards/${boardId}`)
    return { data: updatedList }
  } catch (err) {
    return { error: 'Failed to update list title' }
  }
}

export const updateListTitle = genServerAction(UpdateListTitleSchema, handler)
