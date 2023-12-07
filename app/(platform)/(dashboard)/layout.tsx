import { SideNav } from './_components/SideNav/SideNav'
import { NavBar } from './_components/TopNav'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen">
      <SideNav />
      <NavBar />
      {children}
    </div>
  )
}
