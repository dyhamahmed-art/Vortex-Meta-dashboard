export default function Navbar({ accountName, onLogout }) {
  return (
    <nav style={{
      background: '#0f0f23',
      borderBottom: '1px solid #222',
      padding: '0 32px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '32px', height: '32px', background: '#1877F2',
          borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: '700', color: '#fff', fontSize: '16px'
        }}>M</div>
        <span style={{ color: '#fff', fontWeight: '600', fontSize: '16px' }}>Meta Dashboard</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {accountName && (
          <span style={{ color: '#888', fontSize: '13px' }}>
            📊 {accountName}
          </span>
        )}
        <button
          onClick={onLogout}
          style={{
            background: 'transparent',
            border: '1px solid #333',
            borderRadius: '8px',
            color: '#888',
            padding: '6px 14px',
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Disconnect
        </button>
      </div>
    </nav>
  )
}
