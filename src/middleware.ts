import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let url = new URL(request.url)
  //You can add more complex validation logic here
  let inDraftMode = request.cookies.get('__prerender_bypass')?.value
  const inStoryblok =
    url.searchParams.has('_storyblok') || url.searchParams.has('_preview')
  if (inStoryblok && !inDraftMode) {
    try {
      await fetch(`${request.nextUrl.origin}/api/draft`)
    } catch (error) {
      console.log(error)
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
