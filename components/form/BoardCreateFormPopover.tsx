'use client'

import { ElementRef, RefObject, useRef } from 'react'
import { XIcon } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover'

import { Button } from '@/components/ui/button'
import { BoardCreateForm } from './BoardCreateForm'

interface Props {
  children: React.ReactNode
  side?: 'left' | 'right' | 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}

export const BoardCreateFormPopover = ({
  children,
  side = 'bottom',
  align,
  sideOffset = 0,
}: Props) => {
  const closeRef = useRef<ElementRef<'button'>>(null)

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 xl:w-96 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <Heading />
        <CloseButton closeRef={closeRef} />
        <BoardCreateForm closeRef={closeRef} />
      </PopoverContent>
    </Popover>
  )
}

const Heading = () => (
  <div className="text-sm font-medium text-center text-neutral-600 pb-4">
    Create board
  </div>
)

const CloseButton = (props: { closeRef: RefObject<HTMLButtonElement> }) => {
  return (
    <PopoverClose ref={props.closeRef} asChild>
      <Button
        className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
        variant="ghost"
      >
        <XIcon className="h-4 w-4" />
      </Button>
    </PopoverClose>
  )
}
