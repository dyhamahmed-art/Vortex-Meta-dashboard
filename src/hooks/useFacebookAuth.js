import { useState, useEffect } from 'react'

export function useFacebookAuth() {
  const [token, setToken] = useState(localStorage.getItem('fb_token'))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Load Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: import.meta.env.VITE_FB_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v19.0',
      })
    }

    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script')
      script.id = 'facebook-jssdk'
      script.src = 'https://connect.facebook.net/en_US/sdk.js'
      document.body.appendChild(script)
    }
  }, [])

  const login = () => {
    setLoading(true)
    setError(null)

    if (!window.FB) {
      setError('Facebook SDK still loading — please wait 2 seconds and try again.')
      setLoading(false)
      return
    }

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          const shortToken = response.authResponse.accessToken
          fetch('/api/fb-token-exchange', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ shortToken }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.longLivedToken) {
                localStorage.setItem('fb_token', data.longLivedToken)
                setToken(data.longLivedToken)
              } else {
                setError('Token exchange failed')
              }
              setLoading(false)
            })
            .catch((err) => {
              setError('Login failed: ' + err.message)
              setLoading(false)
            })
        } else {
          setError('Facebook login cancelled')
          setLoading(false)
        }
      },
      { scope: 'ads_read,ads_management' }
    )
  }

  const logout = () => {
    localStorage.removeItem('fb_token')
    localStorage.removeItem('fb_account_id')
    setToken(null)
    if (window.FB) window.FB.logout()
  }

  return { token, loading, error, login, logout }
}
