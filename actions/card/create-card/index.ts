'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { db } from '@/lib/db'
// import { createAuditLog } from '@/lib/create-audit-log'
import { genServerAction } from '@/lib/gen-server-action'

import { CreateCardSchema } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) return { error: 'Insufficient permissions' }

  const { title, boardId, listId } = data

  try {
    const foundList = await db.list.findUnique({
      where: { id: listId, board: { orgId } },
    })

    if (!foundList) return { error: 'That list does not exist' }

    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { position: 'desc' },
      select: { position: true },
    })

    const newPosition = lastCard ? lastCard.position + 1 : 1

    const savedCard = await db.card.create({
      data: { title, listId, position: newPosition },
    })

    // await createAuditLog({
    //   entityId: card.id,
    //   entityTitle: card.title,
    //   entityType: ENTITY_TYPE.CARD,
    //   action: ACTION.CREATE,
    // })

    revalidatePath(`/boards/${boardId}`)
    return { data: savedCard }
  } catch (err) {
    return { error: 'Unable to create task. Please try again later.' }
  }
}

export const createCard = genServerAction(CreateCardSchema, handler)
