import {
  StoryblokComponent,
  getStoryblokApi,
  useStoryblokState,
} from '@storyblok/react'

export default function CatchAllRoute({ story }) {
  story = useStoryblokState(story)
  return (
    <div>
      <h1>Catch All Route</h1>
      <StoryblokComponent blok={story.content} />
    </div>
  )
}
export const getStaticProps = async ({ params: { url }, draftMode }) => {
  console.log({ url, draftMode })
  let slug = url ?? 'home'
  let sbParams = {
    version:
      process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW === 'true' || draftMode
        ? 'draft'
        : 'published',
  }
  const storyblokApi = getStoryblokApi()
  let story
  try {
    let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams)
    story = data?.story
  } catch (error) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      story,
      key: story.id,
    },
    revalidate: 10,
  }
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
