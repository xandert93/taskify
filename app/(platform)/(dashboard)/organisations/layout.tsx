import { OrganisationsMenu } from '../_components/OrganisationsMenu'

export default function OrganisationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
      <div className="flex gap-7">
        <div className="w-64 shrink-0 hidden md:block">
          <OrganisationsMenu lsKey="orgs-menu-desktop" />
        </div>
        {children}
      </div>
    </main>
  )
}
