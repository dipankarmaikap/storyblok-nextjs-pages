// simple example for testing it manually from your browser.
export default function handler(req, res) {
  let requestedUrl = req.url
  //You can add more complex validation logic here
  res.setDraftMode({ enable: true })
  console.log('Draft mode enabled')
  return res.redirect(307, requestedUrl)
}
