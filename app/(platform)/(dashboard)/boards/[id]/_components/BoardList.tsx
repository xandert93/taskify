'use client'

import { ElementRef, useEffect, useRef, useState } from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd'

import { cn } from '@/lib/utils'
import { ListWithCards } from '@/types'

import { TaskCreateForm } from './TaskCreateForm'
import { TaskCard } from './TaskCard'
import { BoardListHeader } from './BoardListHeader'

interface Props {
  list: ListWithCards
  index: number
}

export const BoardList = ({ list, index }: Props) => {
  const textAreaRef = useRef<ElementRef<'textarea'>>(null)

  const [isTaskCreateFormOpen, setIsTaskCreateFormOpen] = useState(false)

  const openTaskCreateForm = () => setIsTaskCreateFormOpen(true)
  const closeTaskCreateForm = () => setIsTaskCreateFormOpen(false)

  // ⚠️ should be able to exist just in <BoardListHeader>, but encountering TS error to do with forwarding the ref...
  useEffect(() => {
    if (!isTaskCreateFormOpen) return

    const textAreaEl = textAreaRef.current!
    textAreaEl.focus()
  }, [isTaskCreateFormOpen])

  return (
    <article className="shrink-0 w-72">
      <div className="rounded-md bg-[#f1f2f4] shadow-md pb-1">
        <BoardListHeader list={list} openTaskCreateForm={openTaskCreateForm} />
        <ol
          className={cn(
            'mx-1 px-1 py-0.5 flex flex-col gap-y-2',
            list.cards.length > 0 ? 'mt-2' : 'mt-0'
          )}
        >
          {list.cards.map((card, index) => (
            <TaskCard index={index} key={card.id} card={card} />
          ))}
        </ol>
        <TaskCreateForm
          list={list}
          ref={textAreaRef}
          isFormOpen={isTaskCreateFormOpen}
          openForm={openTaskCreateForm}
          closeForm={closeTaskCreateForm}
        />
      </div>
    </article>
  )

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <article {...provided.draggableProps} ref={provided.innerRef}>
          <div {...provided.dragHandleProps}>
            <BoardListHeader openTaskCreateForm={openTaskCreateForm} list={list} />
            <Droppable droppableId={list.id} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    'mx-1 px-1 py-0.5 flex flex-col gap-y-2',
                    list.cards.length > 0 ? 'mt-2' : 'mt-0'
                  )}
                >
                  {list.cards.map((card, index) => (
                    <TaskCard index={index} key={card.id} card={card} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
          </div>
        </article>
      )}
    </Draggable>
  )
}
