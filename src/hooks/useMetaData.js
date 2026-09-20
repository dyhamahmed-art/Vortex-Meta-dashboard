import { useState, useCallback } from 'react'
import axios from 'axios'

const BASE = 'https://graph.facebook.com/v19.0'

export function useMetaData(token) {
  const [campaigns, setCampaigns] = useState([])
  const [insights, setInsights] = useState(null)
  const [dailySpend, setDailySpend] = useState([])
  const [adAccounts, setAdAccounts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAdAccounts = useCallback(async () => {
    if (!token) return
    try {
      const res = await axios.get(`${BASE}/me/adaccounts`, {
        params: {
          access_token: token,
          fields: 'id,name,account_status,currency',
          limit: 50,
        },
      })
      setAdAccounts(res.data.data || [])
      return res.data.data
    } catch (err) {
      setError('Failed to fetch ad accounts')
    }
  }, [token])

  const fetchDashboard = useCallback(
    async (accountId, datePreset = 'last_30d') => {
      if (!token || !accountId) return
      setLoading(true)
      setError(null)

      try {
        // Account-level insights (KPI cards)
        const insightsRes = await axios.get(
          `${BASE}/${accountId}/insights`,
          {
            params: {
              access_token: token,
              date_preset: datePreset,
              fields:
                'spend,impressions,clicks,ctr,cpm,cpc,actions,action_values,purchase_roas',
              level: 'account',
            },
          }
        )

        const raw = insightsRes.data.data?.[0] || {}
        const purchases =
          raw.actions?.find((a) => a.action_type === 'purchase')?.value || 0
        const revenue =
          raw.action_values?.find((a) => a.action_type === 'purchase')
            ?.value || 0

        setInsights({
          spend: parseFloat(raw.spend || 0).toFixed(2),
          impressions: parseInt(raw.impressions || 0).toLocaleString(),
          clicks: parseInt(raw.clicks || 0).toLocaleString(),
          ctr: parseFloat(raw.ctr || 0).toFixed(2),
          cpm: parseFloat(raw.cpm || 0).toFixed(2),
          cpc: parseFloat(raw.cpc || 0).toFixed(2),
          purchases,
          revenue: parseFloat(revenue).toFixed(2),
          roas:
            raw.purchase_roas?.[0]?.value
              ? parseFloat(raw.purchase_roas[0].value).toFixed(2)
              : '0.00',
        })

        // Daily spend for chart
        const dailyRes = await axios.get(
          `${BASE}/${accountId}/insights`,
          {
            params: {
              access_token: token,
              date_preset: datePreset,
              fields: 'spend,date_start',
              time_increment: 1,
              level: 'account',
            },
          }
        )
        setDailySpend(
          (dailyRes.data.data || []).map((d) => ({
            date: d.date_start,
            spend: parseFloat(d.spend || 0),
          }))
        )

        // Campaign breakdown
        const campRes = await axios.get(
          `${BASE}/${accountId}/campaigns`,
          {
            params: {
              access_token: token,
              fields:
                'id,name,status,daily_budget,lifetime_budget,insights{spend,impressions,clicks,actions,purchase_roas}',
              date_preset: datePreset,
              limit: 50,
            },
          }
        )

        setCampaigns(
          (campRes.data.data || []).map((c) => {
            const ins = c.insights?.data?.[0] || {}
            const purchases =
              ins.actions?.find((a) => a.action_type === 'purchase')?.value ||
              0
            const spend = parseFloat(ins.spend || 0)
            return {
              id: c.id,
              name: c.name,
              status: c.status,
              budget: c.daily_budget
                ? `$${(c.daily_budget / 100).toFixed(0)}/day`
                : c.lifetime_budget
                ? `$${(c.lifetime_budget / 100).toFixed(0)} lifetime`
                : '—',
              spend: spend.toFixed(2),
              purchases,
              cpr: purchases > 0 ? (spend / purchases).toFixed(2) : '—',
              roas: ins.purchase_roas?.[0]?.value
                ? parseFloat(ins.purchase_roas[0].value).toFixed(2)
                : '—',
            }
          })
        )
      } catch (err) {
        setError('Failed to fetch data: ' + (err.response?.data?.error?.message || err.message))
      }

      setLoading(false)
    },
    [token]
  )

  return {
    campaigns,
    insights,
    dailySpend,
    adAccounts,
    loading,
    error,
    fetchAdAccounts,
    fetchDashboard,
  }
}
