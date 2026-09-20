import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function SpendChart({ data }) {
  if (!data || !data.length) return (
    <div style={{ color: '#888', textAlign: 'center', padding: '40px' }}>No spend data</div>
  )

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis
          dataKey="date"
          tick={{ fill: '#888', fontSize: 12 }}
          tickFormatter={(d) => d.slice(5)}
        />
        <YAxis tick={{ fill: '#888', fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
        <Tooltip
          contentStyle={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
          labelStyle={{ color: '#aaa' }}
          formatter={(v) => [`$${v.toFixed(2)}`, 'Spend']}
        />
        <Line
          type="monotone"
          dataKey="spend"
          stroke="#1877F2"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 5, fill: '#1877F2' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
