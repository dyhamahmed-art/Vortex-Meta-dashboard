import { useState } from 'react'

const STATUS_COLORS = {
  ACTIVE: '#00c48c',
  PAUSED: '#f0a500',
  ARCHIVED: '#888',
  DELETED: '#e55353',
}

export default function CampaignTable({ campaigns }) {
  const [sortKey, setSortKey] = useState('spend')
  const [sortDir, setSortDir] = useState('desc')

  const sorted = [...campaigns].sort((a, b) => {
    const av = parseFloat(a[sortKey]) || 0
    const bv = parseFloat(b[sortKey]) || 0
    return sortDir === 'desc' ? bv - av : av - bv
  })

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    else { setSortKey(key); setSortDir('desc') }
  }

  const th = (label, key) => (
    <th
      onClick={() => toggleSort(key)}
      style={{ padding: '12px 16px', textAlign: 'left', color: '#888', fontWeight: '500',
        fontSize: '13px', cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' }}
    >
      {label} {sortKey === key ? (sortDir === 'desc' ? '↓' : '↑') : ''}
    </th>
  )

  if (!campaigns.length) return (
    <div style={{ color: '#888', textAlign: 'center', padding: '40px' }}>No campaigns found</div>
  )

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #333' }}>
            <th style={{ padding: '12px 16px', textAlign: 'left', color: '#888', fontWeight: '500', fontSize: '13px' }}>Campaign</th>
            <th style={{ padding: '12px 16px', textAlign: 'left', color: '#888', fontWeight: '500', fontSize: '13px' }}>Status</th>
            <th style={{ padding: '12px 16px', textAlign: 'left', color: '#888', fontWeight: '500', fontSize: '13px' }}>Budget</th>
            {th('Spend', 'spend')}
            {th('Purchases', 'purchases')}
            {th('CPR', 'cpr')}
            {th('ROAS', 'roas')}
          </tr>
        </thead>
        <tbody>
          {sorted.map((c, i) => (
            <tr key={c.id} style={{ borderBottom: '1px solid #222', background: i % 2 === 0 ? 'transparent' : '#ffffff05' }}>
              <td style={{ padding: '12px 16px', color: '#fff', maxWidth: '260px' }}>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
              </td>
              <td style={{ padding: '12px 16px' }}>
                <span style={{
                  background: `${STATUS_COLORS[c.status] || '#888'}22`,
                  color: STATUS_COLORS[c.status] || '#888',
                  padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600'
                }}>
                  {c.status}
                </span>
              </td>
              <td style={{ padding: '12px 16px', color: '#aaa' }}>{c.budget}</td>
              <td style={{ padding: '12px 16px', color: '#fff', fontWeight: '600' }}>${c.spend}</td>
              <td style={{ padding: '12px 16px', color: '#fff' }}>{c.purchases}</td>
              <td style={{ padding: '12px 16px', color: c.cpr === '—' ? '#555' : '#f0a500' }}>{c.cpr !== '—' ? `$${c.cpr}` : '—'}</td>
              <td style={{ padding: '12px 16px', color: c.roas === '—' ? '#555' : '#00c48c', fontWeight: '600' }}>{c.roas !== '—' ? `${c.roas}x` : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
