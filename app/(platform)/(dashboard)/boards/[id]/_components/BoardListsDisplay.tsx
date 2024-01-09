'use client'

import { toast } from 'sonner'
import { useEffect, useState } from 'react'
// import { DragDropContext, Droppable } from '@hello-pangea/dnd'

import { ListWithCards } from '@/types'
import { useServerAction } from '@/hooks/useServerAction'
// import { updateListOrder } from '@/actions/update-list-order'
// import { updateCardOrder } from '@/actions/update-card-order'

import { BoardListCreator } from './BoardListCreator'
import { BoardList } from './BoardList'

interface Props {
  lists: ListWithCards[]
  boardId: string
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list)

  const [removed] = result.splice(startIndex, 1)

  result.splice(endIndex, 0, removed)

  return result
}

export const BoardListsDisplay = ({ boardId, lists: initialLists }: Props) => {
  const [lists, setLists] = useState(initialLists)

  // const { mutate: executeUpdateListOrder } = useServerAction(updateListOrder, {
  //   onSuccess: () => toast.success('List re-ordered'),
  //   onError: toast.error,
  // })

  // const { mutate: executeUpdateCardOrder } = useServerAction(updateCardOrder, {
  //   onSuccess: () => toast.success('Card re-ordered'),
  //   onError: toast.error,
  // })

  useEffect(() => {
    setLists(initialLists)
  }, [initialLists])

  // const handleDragEnd = (result: any) => {
  //   const { destination, source, type } = result

  //   if (!destination) return

  //   // if dropped in the same position
  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return
  //   }

  //   // User moves a list
  //   if (type === 'list') {
  //     const items = reorder(lists, source.index, destination.index).map(
  //       (item, index) => ({ ...item, order: index })
  //     )

  //     setLists(items)
  //     executeUpdateListOrder({ items, boardId })
  //   }

  //   // User moves a card
  //   if (type === 'card') {
  //     let newLists = [...lists]

  //     // Source and destination list
  //     const sourceList = newLists.find((list) => list.id === source.droppableId)
  //     const destList = newLists.find((list) => list.id === destination.droppableId)

  //     if (!sourceList || !destList) return

  //     // Check if cards exists on the sourceList
  //     if (!sourceList.cards) {
  //       sourceList.cards = []
  //     }

  //     // Check if cards exists on the destList
  //     if (!destList.cards) {
  //       destList.cards = []
  //     }

  //     // Moving the card in the same list
  //     if (source.droppableId === destination.droppableId) {
  //       const reorderedCards = reorder(sourceList.cards, source.index, destination.index)

  //       reorderedCards.forEach((card, idx) => {
  //         card.order = idx
  //       })

  //       sourceList.cards = reorderedCards

  //       setLists(newLists)
  //       executeUpdateCardOrder({
  //         boardId: boardId,
  //         items: reorderedCards,
  //       })
  //       // User moves the card to another list
  //     } else {
  //       // Remove card from the source list
  //       const [movedCard] = sourceList.cards.splice(source.index, 1)

  //       // Assign the new listId to the moved card
  //       movedCard.listId = destination.droppableId

  //       // Add card to the destination list
  //       destList.cards.splice(destination.index, 0, movedCard)

  //       sourceList.cards.forEach((card, idx) => {
  //         card.order = idx
  //       })

  //       // Update the order for each card in the destination list
  //       destList.cards.forEach((card, idx) => {
  //         card.order = idx
  //       })

  //       setLists(newLists)
  //       executeUpdateCardOrder({
  //         boardId: boardId,
  //         items: destList.cards,
  //       })
  //     }
  //   }
  // }

  // return (
  //   <DragDropContext onDragEnd={handleDragEnd}>
  //     <Droppable droppableId="lists" type="list" direction="horizontal">
  //       {(provided) => (
  //         <ol
  //           {...provided.droppableProps}
  //           ref={provided.innerRef}
  //           className="flex gap-x-3 h-full"
  //         >
  //           <BoardListsList lists={lists} />
  //           {provided.placeholder}
  //           <BoardListCreator />
  //         </ol>
  //       )}
  //     </Droppable>
  //   </DragDropContext>
  // )

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-3">
        <BoardListsList lists={lists} />
        <BoardListCreator />
        <div className="shrink-0 w-1" />
      </div>
    </div>
  )
}

const BoardListsList = ({ lists }: { lists: ListWithCards[] }) => {
  return lists.map((list, index) => <BoardList key={list.id} index={index} list={list} />)
}
