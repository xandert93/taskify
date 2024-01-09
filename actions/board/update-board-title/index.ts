'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { genServerAction } from '@/lib/gen-server-action'

import { UpdateBoardTitleSchema } from './schema'
import { InputType, ReturnType } from './types'
// import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) return { error: 'Insufficient permissions' }

  const { title, id } = data

  try {
    const updatedBoard = await db.board.update({
      where: { id, orgId },
      data: { title },
    })

    // await createAuditLog({
    //   entityTitle: board.title,
    //   entityId: board.id,
    //   entityType: ENTITY_TYPE.BOARD,
    //   action: ACTION.UPDATE,
    // })

    revalidatePath(`/boards/${id}`)
    return { data: updatedBoard }
  } catch (err) {
    return {
      error: 'Failed to update title',
    }
  }
}

export const updateBoardTitle = genServerAction(UpdateBoardTitleSchema, handler)
