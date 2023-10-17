import type { AppProps } from 'next/app'
import '../tailwind.css'
import { storyblokInit, apiPlugin } from '@storyblok/react'
import { components } from '@/src/components/storyblok-components'
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACESS_KEY,
  use: [apiPlugin],
  components,
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
