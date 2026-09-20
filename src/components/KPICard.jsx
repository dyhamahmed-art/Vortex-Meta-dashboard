export default function KPICard({ label, value, prefix = '', suffix = '', color = '#1877F2' }) {
  return (
    <div style={{
      background: '#1a1a2e',
      border: `1px solid ${color}33`,
      borderRadius: '12px',
      padding: '20px 24px',
      minWidth: '160px',
      flex: 1,
    }}>
      <p style={{ color: '#888', fontSize: '13px', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </p>
      <p style={{ color: '#fff', fontSize: '28px', fontWeight: '700', margin: 0 }}>
        {prefix}{value}{suffix}
      </p>
    </div>
  )
}
