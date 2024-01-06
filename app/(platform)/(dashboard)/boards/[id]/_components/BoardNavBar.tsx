import { Board } from '@prisma/client'

import { BoardTitle } from './BoardTitle'
import { BoardSettingsMenu } from './BoardSettingsMenu'

type Props = {
  board: Board
}

export const BoardNavBar = async ({ board }: Props) => {
  return (
    <div className="h-14 bg-black/50 flex justify-between items-center px-6">
      <BoardTitle board={board} />
      <BoardSettingsMenu id={board.id} />
    </div>
  )
}
