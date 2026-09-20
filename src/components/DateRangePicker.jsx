const OPTIONS = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 days', value: 'last_7d' },
  { label: 'Last 14 days', value: 'last_14d' },
  { label: 'Last 30 days', value: 'last_30d' },
  { label: 'Last 90 days', value: 'last_90d' },
  { label: 'This month', value: 'this_month' },
  { label: 'Last month', value: 'last_month' },
]

export default function DateRangePicker({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        background: '#1a1a2e',
        border: '1px solid #333',
        borderRadius: '8px',
        color: '#fff',
        padding: '8px 14px',
        fontSize: '14px',
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      {OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}
