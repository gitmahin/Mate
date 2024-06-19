import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === "/log-in" || path.startsWith("/sign-up")
  const token = request.cookies.get("authToken")?.value || ""

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/log-in', request.url))
  }

}

export const config = {
  matcher: [
    '/log-in',
    '/sign-up/:path*',
    '/admin-area/:path*',
    '/shares-feed',
    '/videos',
    '/find-mates',
    '/',
  ]
}