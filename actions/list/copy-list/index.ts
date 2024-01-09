'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { db } from '@/lib/db'
// import { createAuditLog } from '@/lib/create-audit-log'
import { genServerAction } from '@/lib/gen-server-action'

import { CopyListSchema } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) return { error: 'Insufficient permissions' }

  const { id, boardId } = data

  try {
    const foundList = await db.list.findUnique({
      where: { id, boardId, board: { orgId } },
      include: { cards: true },
    })

    if (!foundList) return { error: 'That list does not exist' }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { position: 'desc' },
      select: { position: true },
    })

    const newPosition = lastList ? lastList.position + 1 : 1

    const savedListCopy = await db.list.create({
      data: {
        boardId: foundList.boardId,
        title: `${foundList.title} - Copy`,
        position: newPosition,
        cards: {
          createMany: {
            data: foundList.cards.map((card) => ({
              title: card.title,
              description: card.description,
              position: card.position,
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    })

    // await createAuditLog({
    //   entityTitle: savedListCopy.title,
    //   entityId: savedListCopy.id,
    //   entityType: ENTITY_TYPE.LIST,
    //   action: ACTION.CREATE,
    // })

    revalidatePath(`/board/${boardId}`)
    return { data: savedListCopy }
  } catch (err) {
    return { error: 'Failed to copy list' }
  }
}

export const copyList = genServerAction(CopyListSchema, handler)
