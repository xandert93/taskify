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

const handler = async (rawNewBoard: NewBoard): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return { error: 'Insufficient permissions' }

  // const isBelowLimit = await hasAvailableCount()
  // const isSubscriber = await checkSubscription()
  let isBelowLimit = true
  let isSubscriber = false

  const canCreate = isBelowLimit || isSubscriber

  if (!canCreate)
    return {
      error: 'You have reached your limit of free boards. Please upgrade to create more.',
    }

  const { title, image } = rawNewBoard

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split('|')

  const newBoard = {
    title,
    orgId,
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageUserName,
    imageLinkHTML,
  }

  try {
    const savedBoard = await db.board.create({ data: newBoard })

    // if (!isSubscriber) await incrementAvailableCount()

    // await createAuditLog({
    //   entityTitle: board.title,
    //   entityId: board.id,
    //   entityType: ENTITY_TYPE.BOARD,
    //   action: ACTION.CREATE,
    // })

    revalidatePath(`/board/${savedBoard.id}`)
    return { data: savedBoard }
  } catch (err) {
    return { error: 'Failed to create board' }
  }
}

export const createBoard = genServerAction(CreateBoardSchema, handler)
