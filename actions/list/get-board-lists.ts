import { db } from '@/lib/db'

export const getBoardLists = (id: string, orgId: string) =>
  db.list.findMany({
    where: {
      boardId: id,
      board: { orgId },
    },
    include: {
      cards: {
        orderBy: {
          position: 'asc',
        },
      },
    },
    orderBy: {
      position: 'asc',
    },
  })
