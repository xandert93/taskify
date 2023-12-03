type Props = {
  params: {
    id: string
  }
}

export default function SingleOrganisationPage({ params: { id } }: Props) {
  return <div>{id}</div>
}
