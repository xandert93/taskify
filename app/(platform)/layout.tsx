import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'

type Props = {
  children: React.ReactNode
}

export default function PlatformLayout({ children }: Props) {
  return (
    <ClerkProvider>
      {children}
      <Toaster />
    </ClerkProvider>
  )
}
