'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useOrganizationList } from '@clerk/nextjs'

// user might imperatively navigate to an organisation page to which they belong, but was not the last one they visited. By default, <OrganizationSwitcher> always displayed the last visited organisation's name. This component updates this, to reflect that of the organisation ID present in the URL.

export const OrganisationFromUrlSetter = () => {
  const { id } = useParams<{ id: string }>()

  const { setActive } = useOrganizationList()

  useEffect(() => {
    if (!setActive) return

    setActive({ organization: id }) // changes "currently active" organisation to that specified by the `id` in the URL
  }, [setActive, id])

  return null
}
