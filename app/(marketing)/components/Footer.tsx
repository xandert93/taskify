import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'

export const Footer = () => {
  return (
    <div className="w-full p-4 border-t bg-slate-100">
      <div className="md:max-w-screen-2xl mx-auto flex items-center justify-between">
        <div className="space-x-4 flex items-center justify-between w-full">
          <Button size="sm" variant="ghost">
            Privacy Policy
          </Button>
          <Button size="sm" variant="ghost">
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  )
}
