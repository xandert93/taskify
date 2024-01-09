'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { genServerAction } from '@/lib/gen-server-action'

import { UpdateListOrder } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) return { error: 'Insufficient permissions' }

  const { items, boardId } = data
  let lists

  try {
    const transaction = items.map((list) =>
      db.list.update({
        where: {
          id: list.id,
          board: {
            orgId,
          },
        },
        data: {
          position: list.position,
        },
      })
    )

    lists = await db.$transaction(transaction)
  } catch (error) {
    return {
      error: 'Failed to reorder.',
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: lists }
}

export const updateListOrder = genServerAction(UpdateListOrder, handler)
