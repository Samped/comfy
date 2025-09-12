import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const AdminLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation() as any

  const from = location.state?.from?.pathname || '/admin'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      if (!res.ok) throw new Error('Invalid credentials')
      const data = await res.json()
      localStorage.setItem('adminToken', data.token)
      navigate(from, { replace: true })
    } catch (e: any) {
      setError(e.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1B3E86' }}>
      <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
        {error && <div className="text-red-400 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-2">Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white" />
        </div>
        <div className="mb-6">
          <label className="block text-sm text-gray-300 mb-2">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white" />
        </div>
        <button type="submit" disabled={loading} className="w-full px-4 py-2 gradient-bg text-white rounded-lg disabled:opacity-50">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}

export default AdminLogin

