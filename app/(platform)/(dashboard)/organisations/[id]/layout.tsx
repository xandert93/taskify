import { auth } from '@clerk/nextjs'
import { OrganisationFromUrlSetter } from './_components/OrganisationFromUrlSetter'
import { startCase } from 'lodash'

type Props = {
  children: React.ReactNode
}

export async function generateMetadata() {
  const { orgSlug } = auth()

  return {
    title: startCase(orgSlug || 'Organisation'),
  }
}

export default function SingleOrganisationPageLayout({ children }: Props) {
  return (
    <>
      <OrganisationFromUrlSetter />
      {children}
    </>
  )
}
