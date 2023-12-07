import { NextResponse } from 'next/server'
import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { paths } from './constants/path-constants'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

// ❓ appears the `return` is required in `afterAuth`?

export default authMiddleware({
  // By default, Clerk's authMiddleware() treats all routes as private if the middleware runs. If you need to make specific routes public, use the publicRoutes option
  publicRoutes: [paths.home, '/api/webhook'],

  afterAuth(auth, req, e) {
    // A user can belong to multiple organisations e.g. Northcoders and Hyperion. `auth.orgId` returns the ID of the organisation the user was last visiting

    const isLoggedIn = Boolean(auth.userId)
    const fromPublicRoute = auth.isPublicRoute // is page they were on (or tried to access) before auth started public?
    const hasOrganisation = Boolean(auth.orgId)

    const organisationUrl = auth.orgId && new URL(`/organisations/${auth.orgId}`, req.url) // if user hasn't selected an organisation yet, `auth.orgId` === `null`
    const organisationSelectionUrl = new URL(paths.select_organisation, req.url)

    // if user authenticated and the login request was made from a public page, send them to their organisation's page. If they don't have an organisation, send them to the organisation selection page
    if (isLoggedIn && fromPublicRoute) {
      return NextResponse.redirect(organisationUrl || organisationSelectionUrl)
    }

    // if they couldn't authenticate and they tried to access a private page, send them to the login page
    if (!isLoggedIn && !fromPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }

    // force authenticated organisation-less users to organisation selection page
    if (
      isLoggedIn &&
      !hasOrganisation &&
      req.nextUrl.pathname !== paths.select_organisation
    ) {
      return NextResponse.redirect(organisationSelectionUrl)
    }
  },
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
