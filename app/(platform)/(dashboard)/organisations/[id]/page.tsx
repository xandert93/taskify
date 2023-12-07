type Props = {
  params: {
    id: string
  }
}

export default function SingleOrganisationPage({ params: { id } }: Props) {
  return <div>Organisation ID: {id}</div>
}
