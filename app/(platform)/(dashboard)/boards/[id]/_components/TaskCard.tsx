'use client'

import { Card } from '@prisma/client'
import { Draggable } from '@hello-pangea/dnd'

// import { useCardModal } from '@/hooks/use-card-modal'

type Props = {
  card: Card
  index: number
}

export const TaskCard = ({ card, index }: Props) => {
  // const cardModal = useCardModal()

  // return (
  //   <Draggable draggableId={card.id} index={index}>
  //     {(provided) => (
  //       <div
  //         {...provided.draggableProps}
  //         {...provided.dragHandleProps}
  //         ref={provided.innerRef}
  //         onClick={() => cardModal.onOpen(card.id)}
  //       >
  //       </div>
  //     )}
  //   </Draggable>
  // )

  return (
    <div
      role="button"
      className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
    >
      {card.title}
    </div>
  )
}
