import { paths } from '@/constants/path-constants'
import { OrganizationList } from '@clerk/nextjs'

export default function OrganisationSelectionPage() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl={paths.single_organisation}
      afterCreateOrganizationUrl={paths.single_organisation}
    />
  )
}
