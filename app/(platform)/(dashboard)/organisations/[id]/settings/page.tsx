import { OrganizationProfile } from '@clerk/nextjs'

export default function SingleOrganisationSettingsPage() {
  return (
    <div className="grow">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: 'shadow-none',
            card: 'shadow-none',
          },
        }}
      />
    </div>
  )
}
