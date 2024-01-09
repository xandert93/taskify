'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { genServerAction } from '@/lib/gen-server-action'

import { DeleteBoardSchema } from './schema'
import { InputType, ReturnType } from './types'
// import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
// import { decreaseAvailableCount } from '@/lib/org-limit'
// import { checkSubscription } from '@/lib/subscription'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) return { error: 'Insufficient permissions' }

  // const isPro = await checkSubscription()

  const { id } = data

  try {
    const deletedBoard = await db.board.delete({
      where: { id, orgId },
    })

    // if (!isPro) {
    //   await decreaseAvailableCount()
    // }

    // await createAuditLog({
    //   entityTitle: deletedBoard.title,
    //   entityId: deletedBoard.id,
    //   entityType: ENTITY_TYPE.BOARD,
    //   action: ACTION.DELETE,
    // })

    revalidatePath(`/organisations/${orgId}`)
  } catch (err: any) {
    console.log(err)
    return { error: 'Failed to delete board' }
  }

  redirect(`/organisations/${orgId}`) // ❓ throws an error when inside try block??
}

export const deleteBoard = genServerAction(DeleteBoardSchema, handler)
