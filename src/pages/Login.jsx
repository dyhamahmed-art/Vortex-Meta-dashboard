export default function Login({ onLogin, loading, error }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a1a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: '#1a1a2e',
        border: '1px solid #222',
        borderRadius: '16px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
      }}>
        <div style={{
          width: '56px', height: '56px', background: '#1877F2',
          borderRadius: '14px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', margin: '0 auto 24px',
          fontSize: '28px', fontWeight: '700', color: '#fff'
        }}>M</div>

        <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', margin: '0 0 8px' }}>
          Meta Dashboard
        </h1>
        <p style={{ color: '#888', fontSize: '14px', margin: '0 0 36px' }}>
          Connect your Facebook account to view your ad performance
        </p>

        {error && (
          <div style={{
            background: '#e5535322', border: '1px solid #e55353',
            borderRadius: '8px', padding: '12px', marginBottom: '20px',
            color: '#e55353', fontSize: '13px'
          }}>
            {error}
          </div>
        )}

        <button
          onClick={onLogin}
          disabled={loading}
          style={{
            background: loading ? '#333' : '#1877F2',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '14px 24px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            transition: 'background 0.2s',
          }}
        >
          {loading ? (
            'Connecting...'
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </>
          )}
        </button>

        <p style={{ color: '#555', fontSize: '12px', marginTop: '20px' }}>
          Your data stays in your browser. We never store your token on our servers.
        </p>
      </div>
    </div>
  )
}
