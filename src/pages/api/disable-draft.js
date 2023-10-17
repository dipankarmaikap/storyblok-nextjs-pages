// simple example for testing it manually from your browser.
export default function handler(req, res) {
  res.setDraftMode({ enable: false })
  res.end('Draft mode is enabled')
}
