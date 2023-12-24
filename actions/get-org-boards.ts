import { db } from '@/lib/db'

export const getOrgBoards = (orgId: string) => {
  return db.board.findMany({
    where: { orgId },
    orderBy: { createdAt: 'desc' },
  })
}
