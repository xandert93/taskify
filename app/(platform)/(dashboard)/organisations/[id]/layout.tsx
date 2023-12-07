import { OrganisationFromUrlSetter } from './_components/OrganisationFromUrlSetter'

type Props = {
  children: React.ReactNode
}

const OrganizationIdLayout = ({ children }: Props) => {
  return (
    <>
      <OrganisationFromUrlSetter />
      {children}
    </>
  )
}

export default OrganizationIdLayout
