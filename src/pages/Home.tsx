import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Calendar, User, Eye } from 'lucide-react'
const API_BASE = import.meta.env.VITE_API_BASE
import ReactMarkdown from "react-markdown";



interface BlogArticle {
  id: string
  title: string
  body: string
  image: string
  author: string
  date: string
  views: number
  category: string
}

const Home = () => {
  const [scrollY, setScrollY] = useState(0)
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageVisible, setImageVisible] = useState(true)
  const [currentExploreIndex, setCurrentExploreIndex] = useState(0)
  const [isExploreTransitioning, setIsExploreTransitioning] = useState(false)
  const [explorePaused, setExplorePaused] = useState(false)
  const [blogArticles, setBlogArticles] = useState<BlogArticle[]>([])
  const [isLoadingArticles, setIsLoadingArticles] = useState(true)

  const roles = ['dreamers', 'artists', 'designers', 'makers', 'coders', 'builders', 'you']

  const comfyImages = [
    'cm.webp',
    'Без_имени-4.webp',
    'hey.webp',
    'skin_3.webp',
    'tyson.webp',
    'comfy.webp',
    'облако1.webp',
    'облако2.webp',
    'muscles.webp',
    'magician.webp',
    'guts.webp',
    'armored_(1).webp',
    'alch.webp',
    'cm_-cm.gif',
    'poker.webp'
  ]

  const exploreItems = [
    { label: 'Community Games', path: '/community-games', customIcon: 'explore/game.png' },
    { label: 'Comfy', path: '/comfy', customIcon: 'explore/art.png' },
    { label: 'InVideo', path: '/art/invideo', customIcon: 'explore/video.png' },
    { label: 'Inco Beats', path: '/incobeats', customIcon: 'explore/music.png' }
  ]

  const showPrevExplore = () => {
    if (isExploreTransitioning) return
    setIsExploreTransitioning(true)
    setExplorePaused(true)
    setCurrentExploreIndex((prev) => (prev - 1 + exploreItems.length) % exploreItems.length)

    // Reset transition state after animation completes
    setTimeout(() => setIsExploreTransitioning(false), 1800)

    // Resume auto-rotation after 40 seconds
    setTimeout(() => setExplorePaused(false), 40000)
  }

  const showNextExplore = () => {
    if (isExploreTransitioning) return
    setIsExploreTransitioning(true)
    setExplorePaused(true)
    setCurrentExploreIndex((prev) => (prev + 1) % exploreItems.length)

    // Reset transition state after animation completes
    setTimeout(() => setIsExploreTransitioning(false), 1800)

    // Resume auto-rotation after 40 seconds
    setTimeout(() => setExplorePaused(false), 40000)
  }

  const getExploreAt = (offset: number) => {
    const idx = (currentExploreIndex + offset + exploreItems.length) % exploreItems.length
    return exploreItems[idx]
  }

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Load blog articles from API
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoadingArticles(true)
        const res = await fetch(`${API_BASE}/api/articles`)
        if (!res.ok) {
          console.warn('Failed to fetch articles from API')
          return
        }
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
        setBlogArticles(mapped.slice(0, 6)) // Show only first 6 articles
      } catch (error) {
        console.warn('Error fetching articles:', error)
        // Fallback: try to load from localStorage if API fails
        const savedArticles = localStorage.getItem('blogArticles')
        if (savedArticles) {
          const articles = JSON.parse(savedArticles)
          setBlogArticles(articles.slice(0, 6))
        }
      } finally {
        setIsLoadingArticles(false)
      }
    }

    // Load articles initially
    loadArticles()

    // Listen for storage changes (when new articles are added)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'blogArticles') {
        loadArticles()
      }
    }

    // Listen for custom events (for same-tab updates)
    const handleArticleUpdate = () => {
      loadArticles()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('blogArticlesUpdated', handleArticleUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('blogArticlesUpdated', handleArticleUpdate)
    }
  }, [])

  // Auto-rotation for explore carousel
  useEffect(() => {
    if (explorePaused) return

    const interval = setInterval(() => {
      if (!isExploreTransitioning) {
        setIsExploreTransitioning(true)
        setCurrentExploreIndex((prev) => (prev + 1) % exploreItems.length)
        setTimeout(() => setIsExploreTransitioning(false), 1200)
      }
    }, 5000) // Auto-rotate every 5 seconds

    return () => clearInterval(interval)
  }, [explorePaused, isExploreTransitioning, exploreItems.length])

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentRoleIndex + 1) % roles.length
      console.log('Changing to word:', roles[nextIndex])
      setCurrentRoleIndex(nextIndex)
    }, 1500) // Reduced to 1.5 seconds for very fast text changes

    return () => clearInterval(interval)
  }, [currentRoleIndex, roles.length])

  useEffect(() => {
    if (roles[currentRoleIndex]) {
      console.log('Starting to type:', roles[currentRoleIndex])
      setIsTyping(true)
      setCurrentText('')

      let index = 0
      const typingInterval = setInterval(() => {
        if (index < roles[currentRoleIndex].length) {
          const newText = roles[currentRoleIndex].slice(0, index + 1)
          setCurrentText(newText)
          console.log('Typing:', newText)
          index++
        } else {
          setIsTyping(false)
          console.log('Finished typing:', roles[currentRoleIndex])
          clearInterval(typingInterval)
        }
      }, 80) // Type each letter every 80ms

      return () => clearInterval(typingInterval)
    }
  }, [currentRoleIndex])

  // Sleek Image cycling effect with fade transition
  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out
      setImageVisible(false)

      // After fade out completes, change image and fade in
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % comfyImages.length)
        setImageVisible(true)
      }, 500) // Wait for fade out to complete

    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [])

  // Auto-advance explore carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExploreIndex((prev) => (prev + 1) % exploreItems.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [])

  // Generate random positions
  const getRandomPosition = (index: number) => {
    const positions = [
      // Top edge - more positions
      { top: '15%', left: '15%' },
      { top: '12%', left: '45%' },
      { top: '10%', right: '20%' },
      { top: '12%', right: '35%' },
      { top: '15%', right: '50%' },

      // Left edge - more positions
      { top: '20%', left: '3%' },
      { top: '40%', left: '8%' },
      { top: '50%', left: '3%' },
      { top: '70%', left: '4%' },
      { top: '80%', left: '7%' },

      // Right edge - more positions
      { top: '25%', right: '3%' },
      { top: '35%', right: '5%' },
      { top: '45%', right: '8%' },
      { top: '55%', right: '3%' },
      { top: '65%', right: '6%' },
      { top: '75%', right: '4%' },
      { top: '85%', right: '7%' },

      // Bottom edge - more positions
      { bottom: '15%', left: '18%' },
      { bottom: '82%', left: '25%' },
      { bottom: '30%', left: '50%' },
      { bottom: '32%', left: '55%' },
      { bottom: '10%', right: '25%' },
      { bottom: '42%', right: '70%' },
      { bottom: '25%', right: '25%' },

      // Corner areas - more precise
      { top: '3%', left: '2%' },
      { bottom: '3%', left: '2%' },
      { bottom: '3%', right: '2%' },

      // Mid-edges
      { top: '50%', left: '1%' },
      { top: '50%', right: '1%' },
      { left: '50%', top: '5%' },
      { left: '50%', bottom: '5%' },

      // Additional edge variations
      { top: '15%', left: '8%' },
      { top: '18%', right: '12%' },
      { bottom: '18%', left: '12%' },
      { bottom: '15%', right: '8%' },

      // More corner variations
      { top: '6%', left: '12%' },
      { top: '6%', right: '12%' },
      { bottom: '6%', left: '12%' },
      { bottom: '6%', right: '12%' },

      // Edge center points
      { top: '25%', left: '0%' },
      { top: '25%', right: '0%' },
      { bottom: '25%', left: '0%' },
      { bottom: '25%', right: '0%' },
      { left: '25%', top: '0%' },
      { left: '25%', bottom: '0%' },
      { right: '25%', top: '0%' },
      { right: '25%', bottom: '0%' }
    ]

    return positions[index % positions.length]
  }

  // Function to increment views when clicking on article
  const incrementViews = async (id: string) => {
    setBlogArticles((prev) => prev.map((a) => a.id === id ? { ...a, views: a.views + 1 } : a))
  }

  return (
    <div className="pt-16" style={{ backgroundColor: '#3673F5', minHeight: '100vh' }}>
      {/* Add CSS for infinite scroll animation and markdown formatting */}
      <style >{`
        @keyframes infiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }

        /* Markdown formatting styles */
        .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
          margin: 0.25rem 0 !important;
          line-height: 1.2 !important;
          color: white !important;
        }

        .prose p {
          margin: 0.25rem 0 !important;
          color: white !important;
        }

        .prose strong {
          font-weight: 700 !important;
          color: white !important;
        }

        .prose em {
          font-style: italic !important;
          color: white !important;
        }

        .prose code {
          background-color: rgba(255, 255, 255, 0.1) !important;
          padding: 0.125rem 0.25rem !important;
          border-radius: 0.25rem !important;
          font-size: 0.875em !important;
          color: white !important;
          font-family: monospace !important;
        }

        .prose ul, .prose ol {
          margin: 0.25rem 0 !important;
          padding-left: 1rem !important;
        }

        .prose li {
          margin: 0.125rem 0 !important;
          color: white !important;
        }

        .prose a {
          color: #60a5fa !important;
          text-decoration: underline !important;
        }

        .prose blockquote {
          border-left: 4px solid rgba(255, 255, 255, 0.3) !important;
          padding-left: 1rem !important;
          margin: 0.5rem 0 !important;
          font-style: italic !important;
          color: rgba(255, 255, 255, 0.8) !important;
        }
      `}</style>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div
            className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow"
            style={{
              animation: 'float 8s ease-in-out infinite',
              transform: `translateY(${scrollY * 0.1}px)`
            }}
          ></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse-slow"
            style={{
              animation: 'float 6s ease-in-out infinite reverse',
              transform: `translateY(${scrollY * -0.05}px)`
            }}
          ></div>

          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-primary-300 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-secondary-300 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* Sleek Animated Comfy Images - Fade In/Out */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={`/comfy/${comfyImages[currentImageIndex]}`}
            alt={`Comfy ${comfyImages[currentImageIndex]}`}
            className={`absolute w-16 h-16 md:w-40 md:h-40 transition-all duration-1000 ease-in-out ${imageVisible
                ? 'opacity-70 scale-100 transform rotate-0'
                : 'opacity-0 scale-95 transform rotate-3'
              }`}
            style={{
              ...getRandomPosition(currentImageIndex),
              animation: imageVisible ? 'float 6s ease-in-out infinite' : 'none',
              filter: imageVisible ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))' : 'none'
            }}
          />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-8"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`
            }}
          >
            <span style={{ color: '#FFFFFF' }}>Comfy Verse</span>
            <span style={{ color: '#FFFFFF' }}> Community Page</span>
          </h1>
          <p
            className="text-2xl sm:text-3xl lg:text-4xl mb-6 max-w-4xl mx-auto leading-relaxed"
            style={{
              color: '#E7EEFE',
              transform: `translateY(${scrollY * 0.05}px)`
            }}
          >
            Where{" "}
            <a
              href="https://www.inco.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#FFFFFF' }}
              className="hover:underline"
            >
              inco
            </a>{" "}
            brilliant minds connect, collaborate, and create the future together.
          </p>
          <div
            className="text-2xl sm:text-3xl lg:text-4xl mb-10 max-w-4xl mx-auto leading-relaxed"
            style={{
              color: '#E7EEFE',
              transform: `translateY(${scrollY * 0.05}px)`
            }}
          >
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ color: '#FFFFFF' }}>A hub for </span>
            <span
              key={currentRoleIndex}
              className="typing-text"
              style={{
                color: '#FFFFFF',
                display: 'inline-block',
                lineHeight: '1',
                verticalAlign: 'middle',
                marginTop: '-0.2em'
              }}
            >
              {currentText || 'dreamers'}
              {isTyping && <span className="typing-cursor">|</span>}
            </span>
          </div>

        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </section>

      {/* Comfy's House Stats Section */}
      <section className="py-7 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/15 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="p-6 rounded-3xl bg-gray-900/50 backdrop-blur-md border border-gray-700/40 mb-12">
            <div className="text-center mb-6 mt-4">
              <h2
                className="text-2xl sm:text-3xl font-bold text-white mb-2"
                style={{
                  textShadow: '0 0 12px rgba(59, 130, 246, 0.35)'
                }}
              >
                Comfy's House
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { number: "15+", label: "Community Games", path: "/community-games" },
                { number: "25+", label: "Comfy Art", path: "/comfy" },
                { number: `${blogArticles.length}+`, label: "Articles", path: "/blog" },
                { number: "12+", label: "Videos", path: "/art/invideo" }
              ].map((stat, index) => (
                <Link
                  key={index}
                  to={stat.path}
                  className="block p-3 md:p-4 rounded-xl bg-gray-800/40 backdrop-blur-md border border-gray-700/40 hover:scale-105 transition-all duration-1000 ease-in-out hover:border-gray-600/50 cursor-pointer"
                  style={{
                    transform: `translateY(${scrollY * 0.01}px)`
                  }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-1">{stat.number}</div>
                  <div className="text-sm sm:text-base md:text-lg font-semibold text-white">{stat.label}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Enhanced Icon Carousel */}
          <div className="relative">
            <div className="relative w-full max-w-6xl h-[350px] mx-auto flex items-center justify-center">
              {/* Previous icon (left side) */}
              {(() => {
                const item = getExploreAt(-1)
                return (
                  <div className={`absolute left-1/4 -translate-x-1/2 -translate-y-1/2 top-1/2 transition-all duration-1500 ease-out ${isExploreTransitioning ? 'scale-95 opacity-30' : 'scale-100 opacity-40'}`}>
                    <Link
                      to={item.path}
                      className="group block"
                    >
                      <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-2 border-gray-700/40 backdrop-blur-lg flex items-center justify-center hover:opacity-70 transition-all duration-1500 ease-out shadow-lg hover:shadow-2xl transform hover:scale-105 hover:rotate-1">
                        {item.customIcon && (
                          <img
                            src={`/${item.customIcon}`}
                            alt={item.label}
                            className="w-32 h-32 md:w-36 md:h-36 object-contain transition-all duration-1500 ease-out filter grayscale group-hover:grayscale-0 group-hover:scale-110"
                          />
                        )}
                      </div>
                    </Link>
                  </div>
                )
              })()}

              {/* Main/Current icon (center) */}
              {(() => {
                const item = getExploreAt(0)
                return (
                  <div className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 transition-all duration-1500 ease-out ${isExploreTransitioning ? 'scale-105 rotate-2' : 'scale-100 rotate-0'}`}>
                    <Link
                      to={item.path}
                      className="group block"
                    >
                      <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br from-gray-800/70 to-gray-900/70 group-hover:bg-white border-4 border-gray-700/50 group-hover:border-white/80 backdrop-blur-lg flex items-center justify-center opacity-100 shadow-2xl hover:shadow-3xl transition-all duration-1500 ease-out transform hover:scale-125 hover:-rotate-1 relative overflow-hidden">
                        {/* Animated glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1500"></div>

                        {item.customIcon && (
                          <img
                            src={`/${item.customIcon}`}
                            alt={item.label}
                            className="w-64 h-64 md:w-80 md:h-80 object-contain transition-all duration-1500 ease-out relative z-10 drop-shadow-lg group-hover:scale-125 group-hover:drop-shadow-2xl"
                          />
                        )}
                      </div>
                    </Link>
                  </div>
                )
              })()}

              {/* Next icon (right side) */}
              {(() => {
                const item = getExploreAt(1)
                return (
                  <div className={`absolute right-1/4 translate-x-1/2 -translate-y-1/2 top-1/2 transition-all duration-1500 ease-out ${isExploreTransitioning ? 'scale-95 opacity-30' : 'scale-100 opacity-40'}`}>
                    <Link
                      to={item.path}
                      className="group block"
                    >
                      <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-2 border-gray-700/40 backdrop-blur-lg flex items-center justify-center hover:opacity-70 transition-all duration-1500 ease-out shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-rotate-1">
                        {item.customIcon && (
                          <img
                            src={`/${item.customIcon}`}
                            alt={item.label}
                            className="w-32 h-32 md:w-36 md:h-36 object-contain transition-all duration-1500 ease-out filter grayscale group-hover:grayscale-0 group-hover:scale-110"
                          />
                        )}
                      </div>
                    </Link>
                  </div>
                )
              })()}

              {/* Enhanced Navigation arrows */}
              <button
                aria-label="Previous"
                onClick={showPrevExplore}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-gray-900/40 border-2 border-gray-700/40 text-white hover:bg-gray-800/60 hover:border-gray-600/60 hover:text-white transition-all duration-1000 shadow-lg hover:shadow-xl backdrop-blur-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                aria-label="Next"
                onClick={showNextExplore}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-gray-900/40 border-2 border-gray-700/40 text-white hover:bg-gray-800/60 hover:border-gray-600/60 hover:text-white transition-all duration-1000 shadow-lg hover:shadow-xl backdrop-blur-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Progress indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {exploreItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentExploreIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-1500 ${index === currentExploreIndex
                      ? 'bg-white shadow-lg scale-125'
                      : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Articles Section */}
      <section className="py-20">
        <div className="max-w-full">
          <div className="text-center mb-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#FFFFFF' }}>
              Latest Articles
            </h2>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8" style={{ color: '#E7EEFE' }}>
              Stay updated with the latest insights, tutorials, and community stories
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
              style={{
                backgroundColor: '#17D45C',
                color: '#FFFFFF'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#7FE8A6'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#17D45C'
              }}
            >
              <span>View All Articles</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Blog Articles Preview */}
          <div className="relative overflow-hidden">
            {isLoadingArticles ? (
              // Loading state
              <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {/* Mobile: Horizontal Infinite Scroll */}
                <div className="block sm:hidden overflow-hidden">
                  <div
                    className="flex animate-infinite-scroll"
                    style={{
                      width: 'max-content',
                      animation: 'infiniteScroll 30s linear infinite'
                    }}
                  >
                    {/* First set of articles */}
                    {blogArticles.length > 0 ? (
                      [...blogArticles, ...blogArticles].map((article, index) => (
                        <Link
                          key={`${article.id}-${index}`}
                          to={`/blog/article/${article.id}`}
                          onClick={() => incrementViews(article.id)}
                          className="flex-shrink-0 w-80 mx-3 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-2xl hover:border-gray-600/40 transition-all duration-300 group overflow-hidden shadow-2xl hover:shadow-3xl"
                        >
                          <div className="relative">
                            {/* Mobile Image */}
                            <div className="h-48 relative overflow-hidden">
                              <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = '/comfy/comfy.webp'
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                              <div className="absolute top-4 left-4">
                                <span className="px-2 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                                  {article.category}
                                </span>
                              </div>
                            </div>
                            {/* Mobile Content */}
                            <div className="p-4">
                              <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors mb-2 line-clamp-2">
                                {article.title}
                              </h3>
                              <div className="text-white text-sm line-clamp-3 mb-4 prose prose-invert prose-sm max-w-none">
                                <ReactMarkdown>{article.body}</ReactMarkdown>
                              </div>
                              <div className="flex items-center justify-between text-xs text-white">
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    <span className="truncate max-w-20">{article.author}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    <span>{article.views}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      // Mobile Default Cards - duplicate for infinite scroll
                      Array(6).fill(0).map((_, index) => (
                        <Link
                          key={`default-${index}`}
                          to="/blog"
                          className="flex-shrink-0 w-80 mx-3 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-2xl hover:border-gray-600/40 transition-all duration-300 group overflow-hidden shadow-2xl hover:shadow-3xl"
                        >
                          <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </div>
                            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm mb-3">
                              Blog
                            </span>
                            <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
                              Explore Our Articles
                            </h3>
                            <p className="text-white text-sm">
                              Discover insightful articles, tutorials, and community stories.
                            </p>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </div>

                {/* Tablet: 2-column Grid */}
                <div className="hidden sm:block lg:hidden px-4 sm:px-6">
                  <div className="grid grid-cols-2 gap-6">
                    {blogArticles.length > 0 ? (
                      blogArticles.slice(0, 4).map((article) => (
                        <Link
                          key={article.id}
                          to={`/blog/article/${article.id}`}
                          onClick={() => incrementViews(article.id)}
                          className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-2xl hover:border-gray-600/40 transition-all duration-300 group overflow-hidden shadow-2xl hover:shadow-3xl"
                        >
                          <div className="h-40 relative overflow-hidden">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = '/comfy/comfy.webp'
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute top-3 left-3">
                              <span className="px-2 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                                {article.category}
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors mb-2 line-clamp-2">
                              {article.title}
                            </h3>
                            <div className="text-white text-sm line-clamp-2 mb-3 prose prose-invert prose-sm max-w-none">
                              <ReactMarkdown>{article.body}</ReactMarkdown>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-3 text-xs text-white">
                                <div className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  <span className="truncate">{article.author}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  <span>{article.views}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-white">
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(article.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="col-span-2">
                        <Link
                          to="/blog"
                          className="block bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-2xl hover:border-gray-600/40 transition-all duration-300 group overflow-hidden shadow-2xl hover:shadow-3xl p-8 text-center"
                        >
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm mb-3">
                            Blog
                          </span>
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
                            Explore Our Articles
                          </h3>
                          <p className="text-white">
                            Discover insightful articles, tutorials, and community stories.
                          </p>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Desktop: Horizontal Infinite Scroll */}
                <div className="hidden lg:block overflow-hidden">
                  <div
                    className="flex animate-infinite-scroll space-x-8 px-8 pb-6"
                    style={{
                      width: 'max-content',
                      animation: 'infiniteScroll 40s linear infinite'
                    }}
                  >
                    {blogArticles.length > 0 ? (
                      [...blogArticles, ...blogArticles].map((article, index) => (
                        <Link
                          key={`${article.id}-${index}`}
                          to={`/blog/article/${article.id}`}
                          onClick={() => incrementViews(article.id)}
                          className="flex-shrink-0 h-80 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-2xl hover:border-gray-600/40 transition-all duration-300 group overflow-hidden shadow-2xl hover:shadow-3xl"
                          style={{ width: '720px' }}
                        >
                          <div className="flex h-full">
                            {/* Image half */}
                            <div className="w-1/2 relative overflow-hidden">
                              <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = '/comfy/comfy.webp'
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/60"></div>
                              <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                                  {article.category}
                                </span>
                              </div>
                            </div>
                            {/* Content half */}
                            <div className="w-1/2 p-6 flex flex-col justify-between">
                              <div>
                                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-3 line-clamp-2">
                                  {article.title}
                                </h3>
                                <div className="text-white text-sm line-clamp-4 mb-4 prose prose-invert prose-sm max-w-none">
                                  <ReactMarkdown>{article.body}</ReactMarkdown>
                                </div>
                              </div>
                              <div className="space-y-3">
                                <div className="flex items-center gap-4 text-xs text-white">
                                  <div className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    <span>{article.author}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    <span>{article.views}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-white">
                                  <Calendar className="w-3 h-3" />
                                  <span>{new Date(article.date).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      // Desktop Default Cards - duplicate for infinite scroll
                      Array(6).fill(0).map((_, index) => (
                        <Link
                          key={`default-${index}`}
                          to="/blog"
                          className="flex-shrink-0 h-80 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-2xl hover:border-gray-600/40 transition-all duration-300 group overflow-hidden shadow-2xl hover:shadow-3xl"
                          style={{ width: '720px' }}
                        >
                          <div className="flex h-full">
                            <div className="w-1/2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                              </div>
                            </div>
                            <div className="w-1/2 p-6 flex flex-col justify-center">
                              <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm mb-3 w-fit">
                                Blog
                              </span>
                              <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-3 line-clamp-2">
                                Explore Our Articles
                              </h3>
                              <p className="text-white text-base line-clamp-3">
                                Discover insightful articles, tutorials, and community stories from the Comfy Verse community.
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home