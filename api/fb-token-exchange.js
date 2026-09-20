// Vercel Serverless Function
// Exchanges a short-lived Facebook token for a long-lived one (60 days)
// Your FB_APP_SECRET never touches the browser

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { shortToken } = req.body

  if (!shortToken) {
    return res.status(400).json({ error: 'shortToken is required' })
  }

  try {
    const appId = process.env.VITE_FB_APP_ID
    const appSecret = process.env.FB_APP_SECRET

    const url = `https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortToken}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.error) {
      return res.status(400).json({ error: data.error.message })
    }

    return res.status(200).json({
      longLivedToken: data.access_token,
      expiresIn: data.expires_in,
    })
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error: ' + err.message })
  }
}
