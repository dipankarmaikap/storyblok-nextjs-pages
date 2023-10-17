// simple example for testing it manually from your browser.
export default function handler(req, res) {
  const f_url = `https://${req.headers.host}${req.url}`
  const url = new URL(f_url)

  //You can add more complex validation logic here
  const inStoryblok =
    url.searchParams.has('_storyblok') || url.searchParams.has('_preview')
  console.log({ inStoryblok })
  if (inStoryblok) {
    res.redirect(307, url.pathname)
  }
  res.setDraftMode({ enable: true })
  res.end('Draft mode is enabled')
  // console.log('Draft mode enabled')
  // res.redirect(307, requestedUrl)
}
