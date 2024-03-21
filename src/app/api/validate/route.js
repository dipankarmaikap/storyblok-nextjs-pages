import { getSignature } from '../../../pages/api/webhook'
export async function POST(request) {
  const payload = await request.text()
  const signature = await request.headers.get('webhook-signature')
  const matched = getSignature(payload) === signature

  return Response.json({
    payload,
    matched,
    signature,
    generateSignature: getSignature(payload),
  })
}
