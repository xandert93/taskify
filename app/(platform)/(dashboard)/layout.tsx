import { SideNav } from './_components/SideNav/SideNav'
import { TopNav } from './_components/TopNav'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen">
      <SideNav />
      <TopNav />
      {children}
    </div>
  )
}
