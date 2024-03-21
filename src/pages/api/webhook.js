import { createHmac } from 'node:crypto'

const webhookSecret = 'hello'
export const getSignature = (body) =>
  createHmac('sha1', webhookSecret).update(body).digest('hex')
export default async function handler(req, res) {
  const signature = req.headers['webhook-signature']
  const buf = await buffer(req)
  const payload = buf.toString('utf8')

  const matched = getSignature(payload) === signature
  res.status(200).json({
    payload,
    matched,
    signature,
    generateSignature: getSignature(payload),
  })
}
export const config = {
  api: {
    bodyParser: false,
  },
}

async function buffer(readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}
