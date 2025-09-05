import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, Save, Eye } from 'lucide-react'
import { BlogArticle } from './Blog'
import { formatText } from '../utils/textFormatter'

const EditBlog = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    image: '',
    author: '',
    category: 'general'
  })
  const [isPreview, setIsPreview] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [originalArticle, setOriginalArticle] = useState<BlogArticle | null>(null)
  const [showFormattingGuide, setShowFormattingGuide] = useState(false)

  const categories = [
    'general',
    'tutorial',
    'guide',
    'community',
    'updates',
    'tech',
    'events',
    'art',
    'gaming'
  ]

  useEffect(() => {
    if (!id) {
      navigate('/blog')
      return
    }

    const savedArticles = JSON.parse(localStorage.getItem('blogArticles') || '[]')
    const article = savedArticles.find((article: BlogArticle) => article.id === id)
    
    if (article) {
      setOriginalArticle(article)
      setFormData({
        title: article.title,
        body: article.body,
        image: article.image,
        author: article.author,
        category: article.category
      })
      setImagePreview(article.image)
    } else {
      navigate('/blog')
    }
    
    setLoading(false)
  }, [id, navigate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setFormData(prev => ({
          ...prev,
          image: result
        }))
        setImagePreview(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setFormData(prev => ({
      ...prev,
      image: url
    }))
    setImagePreview(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.body.trim() || !formData.author.trim()) {
      alert('Please fill in all required fields')
      return
    }

    if (!originalArticle) return

    setIsSubmitting(true)

    try {
      // Update article
      const updatedArticle: BlogArticle = {
        ...originalArticle,
        title: formData.title.trim(),
        body: formData.body.trim(),
        image: formData.image || '/comfy/comfy.webp',
        author: formData.author.trim(),
        category: formData.category
      }

      // Get existing articles from localStorage
      const existingArticles = JSON.parse(localStorage.getItem('blogArticles') || '[]')
      
      // Update the article
      const updatedArticles = existingArticles.map((article: BlogArticle) =>
        article.id === originalArticle.id ? updatedArticle : article
      )
      
      // Save to localStorage
      localStorage.setItem('blogArticles', JSON.stringify(updatedArticles))
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('blogArticlesUpdated'))
      
      // Navigate to the article view
      navigate(`/blog/article/${originalArticle.id}`)
    } catch (error) {
      console.error('Error updating article:', error)
      alert('Failed to update article. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0f172a' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading article...</p>
        </div>
      </div>
    )
  }

  if (isPreview) {
    return (
      <div className="pt-16 min-h-screen" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Preview Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setIsPreview(false)}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Edit</span>
            </button>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
              Preview Mode
            </span>
          </div>

          {/* Article Preview */}
          <article className="glass rounded-2xl overflow-hidden">
            {/* Article Image */}
            {imagePreview && (
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={imagePreview}
                  alt={formData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                    {formData.category}
                  </span>
                </div>
              </div>
            )}

            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {formData.title || 'Article Title'}
              </h1>
              
              <div className="flex items-center space-x-4 text-gray-400 text-sm mb-8">
                <span>By {formData.author || 'Author Name'}</span>
                <span>•</span>
                <span>{originalArticle ? new Date(originalArticle.date).toLocaleDateString() : new Date().toLocaleDateString()}</span>
                <span>•</span>
                <span>Updated</span>
              </div>

              <div className="prose prose-invert max-w-none">
                <div className="leading-relaxed">
                  {formData.body ? formatText(formData.body) : (
                    <span className="text-gray-400">Article content will appear here...</span>
                  )}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen" style={{ backgroundColor: '#0f172a' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(`/blog/article/${id}`)}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Article</span>
            </button>
            <h1 className="text-2xl font-bold text-white">Edit Article</h1>
          </div>
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setIsPreview(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass rounded-2xl p-6">
            {/* Title */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Article Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter your article title..."
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Author and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Your name..."
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Article Image
              </label>
              
              <div className="space-y-4">
                {/* File Upload */}
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>Upload New Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <span className="text-gray-400 text-sm">or</span>
                </div>
                
                {/* URL Input */}
                <input
                  type="url"
                  placeholder="Enter image URL..."
                  value={formData.image}
                  onChange={handleImageUrlChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Body */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="body" className="block text-sm font-medium text-gray-300">
                  Article Content *
                </label>
                <button
                  type="button"
                  onClick={() => setShowFormattingGuide(!showFormattingGuide)}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {showFormattingGuide ? 'Hide' : 'Show'} Formatting Guide
                </button>
              </div>
              
              {/* Formatting Guide */}
              {showFormattingGuide && (
                <div className="mb-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
                  <h4 className="text-sm font-semibold text-white mb-3">Text Formatting Guide:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-2">
                      <div>
                        <span className="text-gray-400">Links:</span>
                        <code className="ml-2 text-blue-300">[text](url)</code>
                      </div>
                      <div>
                        <span className="text-gray-400">Bold:</span>
                        <code className="ml-2 text-blue-300">**text**</code>
                      </div>
                      <div>
                        <span className="text-gray-400">Italic:</span>
                        <code className="ml-2 text-blue-300">*text*</code>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-gray-400">Uppercase:</span>
                        <code className="ml-2 text-blue-300">{'{{text}}'}</code>
                      </div>
                      <div>
                        <span className="text-gray-400">Highlight:</span>
                        <code className="ml-2 text-blue-300">==text==</code>
                      </div>
                      <div>
                        <span className="text-gray-400">Code:</span>
                        <code className="ml-2 text-blue-300">`code`</code>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-gray-400">
                    <strong>Examples:</strong> Check out {'{{IMPORTANT}}'} news at [Google](https://google.com) and use `console.log()` for **debugging**.
                  </div>
                </div>
              )}
              
              <textarea
                id="body"
                name="body"
                value={formData.body}
                onChange={handleInputChange}
                placeholder="Write your article content here...

Examples:
- For links: [Google](https://google.com)
- For capital letters: {{IMPORTANT TEXT}}
- For bold: **bold text**
- For highlights: ==highlighted text=="
                rows={12}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                <span>{isSubmitting ? 'Updating...' : 'Update Article'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBlog 