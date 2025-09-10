import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Edit, Trash2, RefreshCw } from 'lucide-react'

export interface ArticleApiModel {
  _id: string
  title: string
  body: string
  image: string
  author: string
  date: string
  views: number
  category: string
}

const Admin = () => {
  const [articles, setArticles] = useState<ArticleApiModel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('all')
  const navigate = useNavigate()

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (q) params.set('q', q)
      if (category && category !== 'all') params.set('category', category)
      const res = await fetch(`/api/articles?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to load')
      const data = await res.json()
      setArticles(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(articles.map((a) => a.category)))],
    [articles]
  )

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article?')) return
    const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setArticles((prev) => prev.filter((a) => a._id !== id))
    }
  }

  return (
    <div className="pt-16 min-h-screen" style={{ backgroundColor: '#0f172a' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchArticles}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
            >
              <span className="inline-flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Refresh</span>
            </button>
            <button
              onClick={() => navigate('/admin/create')}
              className="px-4 py-2 gradient-bg text-white rounded-lg hover:scale-105 transition"
            >
              <span className="inline-flex items-center gap-2"><Plus className="w-4 h-4" /> New Article</span>
            </button>
          </div>
        </div>

        <div className="glass rounded-2xl p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search..."
              className="w-full md:max-w-md px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center gap-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button
                onClick={fetchArticles}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
              >Apply</button>
            </div>
          </div>
        </div>

        {error && <div className="text-red-400 mb-4">{error}</div>}

        {loading ? (
          <div className="text-gray-400">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a) => (
              <div key={a._id} className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/30 rounded-2xl overflow-hidden">
                {a.image && (
                  <div className="h-40 overflow-hidden"><img src={a.image} alt={a.title} className="w-full h-full object-cover" /></div>
                )}
                <div className="p-4">
                  <div className="text-xs text-gray-400 mb-2">{new Date(a.date || a._id.substring(0,8)).toLocaleDateString()} • {a.category}</div>
                  <h3 className="text-white font-semibold mb-2 line-clamp-2">{a.title}</h3>
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/edit/${a._id}`} className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 inline-flex items-center gap-2">
                      <Edit className="w-4 h-4" /> Edit
                    </Link>
                    <button onClick={() => handleDelete(a._id)} className="px-3 py-2 bg-red-700 text-white rounded hover:bg-red-600 inline-flex items-center gap-2">
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin

