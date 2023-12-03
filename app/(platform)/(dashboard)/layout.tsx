import { NavBar } from './_components/NavBar'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen">
      <NavBar />
      {children}
    </div>
  )
}
