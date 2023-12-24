'use server'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { genServerAction } from '@/lib/gen-server-action'

import { NewBoard, ReturnType } from './types'
import { CreateBoardSchema } from './schema'

// import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
// import { incrementAvailableCount, hasAvailableCount } from '@/lib/org-limit'
// import { checkSubscription } from '@/lib/subscription'

const handler = async (newBoard: NewBoard): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return { error: 'Insufficient permissions' }

  // const canCreate = await hasAvailableCount()
  // const isPro = await checkSubscription()
  let canCreate = true
  let isPro = false

  if (!canCreate && !isPro)
    return {
      error: 'You have reached your limit of free boards. Please upgrade to create more.',
    }

  const { title, image } = newBoard

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split('|')

  if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
    return {
      error: 'Missing fields. Failed to create board.',
    }
  }

  let board

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      },
    })

    if (!isPro) {
      await incrementAvailableCount()
    }

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    })
  } catch (err) {
    return {
      error: 'Failed to create.',
    }
  }

  revalidatePath(`/board/${board.id}`)
  return { data: board }
}

export const createBoard = genServerAction(CreateBoardSchema, handler)
