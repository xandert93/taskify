import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { BoardListsDisplay } from './_components/BoardListsDisplay'
import { paths } from '@/constants/path-constants'
import { getBoardLists } from '@/actions/list/get-board-lists'

type Props = {
  params: {
    id: string
  }
}

export default async function SingleBoardPage({ params }: Props) {
  const { orgId } = auth()
  if (!orgId) redirect(paths.select_organisation)

  const lists = await getBoardLists(params.id, orgId)

  return <BoardListsDisplay boardId={params.id} lists={lists} />
}
