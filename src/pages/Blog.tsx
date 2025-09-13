import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, Eye, Edit } from 'lucide-react'
import ReactMarkdown from "react-markdown"
const API_BASE = import.meta.env.VITE_API_BASE

export interface BlogArticle {
  id: string
  title: string
  body: string
  image: string
  author: string
  date: string
  views: number
  category: string
}

const Blog = () => {
  const [articles, setArticles] = useState<BlogArticle[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Load articles from API on component mount
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/articles`)
        if (!res.ok) return
        const data = await res.json()
        const mapped = data.map((a: any) => ({
          id: a._id,
          title: a.title,
          body: a.body,
          image: a.image,
          author: a.author,
          date: a.date || a.createdAt,
          views: a.views,
          category: a.category
        }))
        setArticles(mapped)
      } catch (e) {
        // ignore
      }
    }
    load()
  }, [])

  // Filter articles based on search and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.body.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(articles.map(article => article.category)))]

  const incrementViews = async (id: string) => {
    // optimistically update local state; server will persist when article view page requests with increment=true
    setArticles((prev) => prev.map((a) => a.id === id ? { ...a, views: a.views + 1 } : a))
  }

  return (
    <div className="pt-16 min-h-screen" style={{ backgroundColor: '#1B3E86' }}>
      {/* Add CSS for markdown formatting */}
      <style>{`
        /* Markdown formatting styles */
        .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
          margin: 0.25rem 0 !important;
          line-height: 1.2 !important;
          color: rgb(156, 163, 175) !important; /* text-gray-400 */
        }

        .prose p {
          margin: 0.25rem 0 !important;
          color: rgb(156, 163, 175) !important; /* text-gray-400 */
        }

        .prose strong {
          font-weight: 700 !important;
          color: rgb(156, 163, 175) !important; /* text-gray-400 */
        }

        .prose em {
          font-style: italic !important;
          color: rgb(156, 163, 175) !important; /* text-gray-400 */
        }

        .prose code {
          background-color: rgba(255, 255, 255, 0.1) !important;
          padding: 0.125rem 0.25rem !important;
          border-radius: 0.25rem !important;
          font-size: 0.875em !important;
          color: rgb(156, 163, 175) !important; /* text-gray-400 */
          font-family: monospace !important;
        }

        .prose ul, .prose ol {
          margin: 0.25rem 0 !important;
          padding-left: 1rem !important;
        }

        .prose li {
          margin: 0.125rem 0 !important;
          color: rgb(156, 163, 175) !important; /* text-gray-400 */
        }

        .prose a {
          color: #60a5fa !important;
          text-decoration: underline !important;
        }

        .prose blockquote {
          border-left: 4px solid rgba(156, 163, 175, 0.3) !important;
          padding-left: 1rem !important;
          margin: 0.5rem 0 !important;
          font-style: italic !important;
          color: rgba(156, 163, 175, 0.8) !important;
        }

        /* Custom dropdown arrow for mobile select */
        .custom-select {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239CA3AF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
        }

        /* Hide default select arrow */
        .custom-select::-ms-expand {
          display: none;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Comfy Verse</span>
            <span className="text-white"> Blog</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            All our content is collected here. Yep, just ours, and just content, right on this page. For you! Check it out:
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-2xl p-4 sm:p-6">
            {/* Mobile Layout */}
            <div className="block sm:hidden space-y-4">
              {/* Search Input */}
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              
              {/* Category Dropdown */}
              <div className="w-full">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none cursor-pointer custom-select"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-gray-800 text-white">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Desktop/Tablet Layout */}
            <div className="hidden sm:flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                />
              </div>
              
              {/* Category Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'gradient-bg text-white'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Edit className="w-10 sm:w-12 h-10 sm:h-12 text-gray-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-4">No Articles Yet</h3>
              <p className="text-sm sm:text-base text-gray-400">Check back later for new articles from the community!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="group bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-xl sm:rounded-2xl overflow-hidden hover:border-gray-600/40 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl"
                >
                  {/* Article Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/comfy/comfy.webp' // Fallback image
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                      <span className="px-2 sm:px-3 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 line-clamp-2 group-hover:text-blue-300 transition-colors">
                      {article.title}
                    </h3>
                    
                    <div className="text-gray-400 text-sm mb-3 sm:mb-4 line-clamp-3 prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown>{article.body}</ReactMarkdown>
                    </div>

                    {/* Article Meta - Mobile Optimized */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 mb-3 sm:mb-4 gap-2 sm:gap-0">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 flex-shrink-0" />
                          <span className="whitespace-nowrap">{new Date(article.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3 flex-shrink-0" />
                        <span>{article.views}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/blog/article/${article.id}`}
                        onClick={() => incrementViews(article.id)}
                        className="w-full gradient-bg text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-center hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Blog