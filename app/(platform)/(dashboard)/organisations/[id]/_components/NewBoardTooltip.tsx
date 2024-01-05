import { Tooltip } from '@/components/Tooltip'
import { HelpCircleIcon } from 'lucide-react'

export const NewBoardTooltip = () => {
  return (
    <Tooltip
      sideOffset={40}
      description="Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace."
    >
      <HelpCircleIcon className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
    </Tooltip>
  )
}
