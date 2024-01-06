'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { genServerAction } from '@/lib/gen-server-action'

import { CreateListSchema } from './schema'
import { InputType, ReturnType } from './types'
// import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) return { error: 'Insufficient permissions' }

  const { title, boardId } = data

  try {
    const foundBoard = await db.board.findUnique({
      where: { id: boardId, orgId },
    })

    if (!foundBoard) return { error: 'Board not found' }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { position: 'desc' },
      select: { position: true },
    })

    const savedList = await db.list.create({
      data: {
        boardId,
        title,
        position: lastList ? lastList.position + 1 : 1,
      },
    })

    // await createAuditLog({
    //   entityTitle: list.title,
    //   entityId: list.id,
    //   entityType: ENTITY_TYPE.LIST,
    //   action: ACTION.CREATE,
    // })

    revalidatePath(`/board/${boardId}`)
    return { data: savedList }
  } catch (err) {
    return { error: 'Failed to create list' }
  }
}

export const createList = genServerAction(CreateListSchema, handler)
