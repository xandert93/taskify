import { paths } from '@/constants/path-constants'
import { auth } from '@clerk/nextjs'
import { notFound, redirect } from 'next/navigation'

import { getSingleBoard } from '@/actions/board/get-single-board'
import { BoardNavBar } from './_components/BoardNavBar'

type Context = {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Context) {
  const { orgId } = auth()

  if (!orgId) return { title: 'Board' }
  else {
    const board = await getSingleBoard(params.id, orgId) // ⚠️ really not a fan of the duplicate fetch pattern...but perhaps Next says its optimised or something?

    return { title: board?.title || 'Board' }
  }
}

type Props = {
  children: React.ReactNode
} & Context

export default async function SingleBoardPageLayout({ children, params }: Props) {
  const { orgId } = auth()
  if (!orgId) redirect(paths.select_organisation)

  const board = await getSingleBoard(params.id, orgId)
  if (!board) notFound()

  return (
    <div
      className="bg-no-repeat bg-cover bg-center brightness-90"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavBar board={board} />
      <main className="p-4">{children}</main>
    </div>
  )
}
