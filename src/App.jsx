import { useFacebookAuth } from './hooks/useFacebookAuth'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

export default function App() {
  const { token, loading, error, login, logout } = useFacebookAuth()

  if (!token) {
    return <Login onLogin={login} loading={loading} error={error} />
  }

  return <Dashboard token={token} onLogout={logout} />
}
