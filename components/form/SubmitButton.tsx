'use client'

import { useFormStatus } from 'react-dom'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// ⚠️ surely a better way to do this using shadcn types?
type variant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | 'primary'

interface Props {
  children: React.ReactNode
  disabled?: boolean
  className?: string
  variant?: variant
}

export const SubmitButton = ({
  variant = 'primary',
  className,
  disabled,
  children,
}: Props) => {
  const { pending } = useFormStatus()

  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      size="sm"
      className={cn(className)}
    >
      {children}
    </Button>
  )
}
