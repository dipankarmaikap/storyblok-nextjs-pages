/** @type {import('next').NextConfig} */

let enableDraft =
  process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW === 'true'
    ? [
        {
          source: '/:path*',
          has: [
            {
              type: 'query',
              key: '_storyblok_tk[space_id]',
              value: '257511',
            },
          ],
          destination: '/api/draft',
        },
      ]
    : []
const nextConfig = {
  async rewrites() {
    return [...enableDraft]
  },
}

module.exports = nextConfig
