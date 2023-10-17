import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  //you can add more logic
  if (
    process.env.NODE_ENV !== 'development' &&
    process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW === 'true'
  ) {
    let isDraftEnable = request.cookies.get('__prerender_bypass')?.value
    if (!isDraftEnable) {
      let url = new URL(request.url)
      console.log('Enabeling draftmode')
      try {
        await fetch(`${url?.origin}/api/draft`)
      } catch (error) {
        console.log(error)
      }
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
