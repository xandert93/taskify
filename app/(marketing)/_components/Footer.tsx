import { Button } from '@/components/ui/button'

export const Footer = () => {
  return (
    <footer className="h-14 md:h-16 flex justify-between items-center px-4 border-t">
      <Button size="sm" variant="ghost">
        Privacy Policy
      </Button>
      <Button size="sm" variant="ghost">
        Terms of Service
      </Button>
    </footer>
  )
}
