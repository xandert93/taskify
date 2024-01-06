import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'

import { ListContainer } from './_components/list-container'
import { paths } from '@/constants/path-constants'

type Props = {
  params: {
    id: string
  }
}

export default async function SingleBoardPage({ params }: Props) {
  const { orgId } = auth()
  if (!orgId) redirect(paths.select_organisation)

  const lists = await db.list.findMany({
    where: {
      boardId: params.id,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: {
      order: 'asc',
    },
  })

  return (
    <div className="p-4 h-full overflow-x-auto">
      coming soon
      {/* <ListContainer boardId={params.boardId} data={lists} /> */}
    </div>
  )
}
