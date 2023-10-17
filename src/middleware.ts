import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let enablePreview = process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW === 'true'
  let inDraftMode = request.cookies.get('__prerender_bypass')?.value
  if (inDraftMode) {
    console.log('Draft mode is enabled')
  }
  //You can add more complex validation logic here
  let fetchUrl = `${
    enablePreview ? 'https://localhost:3010' : request.nextUrl.origin
  }/api/draft`
  console.log({
    inDraftMode,
    fetchUrl,
    t: `${request.nextUrl.origin}/api/draft`,
  })
  if (enablePreview && !inDraftMode) {
    try {
      await fetch(fetchUrl)
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
