import { Footer } from './_components/Footer'
import { NavBar } from './_components/NavBar'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen select-none">
      <NavBar />
      <main className="flex-1 bg-slate-100 flex justify-center p-4">{children}</main>
      <Footer />
    </div>
  )
}
