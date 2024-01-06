import { PlusIcon } from 'lucide-react'

type Props = {
  showForm: () => void
}

export const BoardListCreateFormToggle = ({ showForm }: Props) => {
  return (
    <button
      onClick={showForm}
      className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
    >
      <PlusIcon className="h-4 w-4 mr-2" />
      Create list
    </button>
  )
}
