import { db } from '@/lib/db'

export const getSingleBoard = (id: string, orgId: string) =>
  db.board.findUnique({
    where: {
      id,
      orgId,
    },
  })
