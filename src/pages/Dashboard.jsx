import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import KPICard from '../components/KPICard'
import CampaignTable from '../components/CampaignTable'
import SpendChart from '../components/SpendChart'
import DateRangePicker from '../components/DateRangePicker'
import { useMetaData } from '../hooks/useMetaData'

export default function Dashboard({ token, onLogout }) {
  const [selectedAccount, setSelectedAccount] = useState(
    localStorage.getItem('fb_account_id') || ''
  )
  const [datePreset, setDatePreset] = useState('last_30d')

  const {
    campaigns, insights, dailySpend, adAccounts,
    loading, error, fetchAdAccounts, fetchDashboard,
  } = useMetaData(token)

  useEffect(() => {
    fetchAdAccounts().then((accounts) => {
      if (accounts?.length && !selectedAccount) {
        const first = accounts[0].id
        setSelectedAccount(first)
        localStorage.setItem('fb_account_id', first)
      }
    })
  }, [token])

  useEffect(() => {
    if (selectedAccount) fetchDashboard(selectedAccount, datePreset)
  }, [selectedAccount, datePreset])

  const currentAccount = adAccounts.find((a) => a.id === selectedAccount)

  const handleAccountChange = (id) => {
    setSelectedAccount(id)
    localStorage.setItem('fb_account_id', id)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a1a', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar accountName={currentAccount?.name} onLogout={onLogout} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <select
            value={selectedAccount}
            onChange={(e) => handleAccountChange(e.target.value)}
            style={{
              background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px',
              color: '#fff', padding: '8px 14px', fontSize: '14px', cursor: 'pointer', outline: 'none',
            }}
          >
            {adAccounts.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>

          <DateRangePicker value={datePreset} onChange={setDatePreset} />

          <button
            onClick={() => fetchDashboard(selectedAccount, datePreset)}
            disabled={loading}
            style={{
              background: '#1877F2', color: '#fff', border: 'none',
              borderRadius: '8px', padding: '8px 18px', fontSize: '14px',
              fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Loading...' : '↻ Refresh'}
          </button>
        </div>

        {error && (
          <div style={{
            background: '#e5535322', border: '1px solid #e55353', borderRadius: '8px',
            padding: '12px 16px', marginBottom: '24px', color: '#e55353', fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {/* KPI Cards */}
        {insights && (
          <div style={{ display: 'flex', gap: '16px', marginBottom: '28px', flexWrap: 'wrap' }}>
            <KPICard label="Total Spend" value={insights.spend} prefix="$" />
            <KPICard label="Purchases" value={insights.purchases} color="#00c48c" />
            <KPICard label="Revenue" value={insights.revenue} prefix="$" color="#00c48c" />
            <KPICard label="ROAS" value={insights.roas} suffix="x" color="#00c48c" />
            <KPICard label="CPR" value={insights.cpr || '—'} prefix={insights.cpr ? '$' : ''} color="#f0a500" />
            <KPICard label="CTR" value={insights.ctr} suffix="%" color="#a78bfa" />
            <KPICard label="CPM" value={insights.cpm} prefix="$" color="#a78bfa" />
            <KPICard label="CPC" value={insights.cpc} prefix="$" color="#a78bfa" />
          </div>
        )}

        {/* Spend Chart */}
        <div style={{
          background: '#1a1a2e', border: '1px solid #222', borderRadius: '12px',
          padding: '24px', marginBottom: '28px'
        }}>
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: '600', margin: '0 0 20px' }}>
            Daily Spend
          </h2>
          <SpendChart data={dailySpend} />
        </div>

        {/* Campaign Table */}
        <div style={{
          background: '#1a1a2e', border: '1px solid #222', borderRadius: '12px', padding: '24px'
        }}>
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: '600', margin: '0 0 20px' }}>
            Campaigns ({campaigns.length})
          </h2>
          <CampaignTable campaigns={campaigns} />
        </div>

      </div>
    </div>
  )
}
