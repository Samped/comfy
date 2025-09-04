import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, Users, Lightbulb, Rocket, Star, Gamepad2, Palette, ImageIcon, Film, Music, Smile } from 'lucide-react'

const Home = () => {
  const [scrollY, setScrollY] = useState(0)
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageVisible, setImageVisible] = useState(true)
  const [currentExploreIndex, setCurrentExploreIndex] = useState(0)

  const roles = ['dreamers', 'artists', 'designers', 'makers', 'coders', 'builders', 'you']
  
  const comfyImages = [
    'cm.webp',
    'cmpng.webp', 
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
    { label: 'Community Games', path: '/community-games', Icon: Gamepad2 },
    { label: 'Comfy', path: '/comfy', Icon: ImageIcon },
    { label: 'InVideo', path: '/art/invideo', Icon: Film },
    { label: 'Meme', path: '/art/meme', Icon: Smile },
    { label: 'Inco Beats', path: '/', Icon: Music }
  ]

  const showPrevExplore = () => {
    setCurrentExploreIndex((prev) => (prev - 1 + exploreItems.length) % exploreItems.length)
  }

  const showNextExplore = () => {
    setCurrentExploreIndex((prev) => (prev + 1) % exploreItems.length)
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

  // Generate random positions
  const getRandomPosition = (index: number) => {
    const positions = [
      // Top edge - more positions
      { top: '15%', left: '15%' },
      { top: '20%', left: '30%' },
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
      { top: '3%', right: '2%' },
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

  return (
    <div className="pt-16">
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
            className={`absolute w-16 h-16 md:w-40 md:h-40 transition-all duration-500 ease-in-out ${
              imageVisible 
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
            <span className="gradient-text animate-gradient">Comfy Verse</span>
            <span className="text-white"> Community Page</span>
          </h1>
          <p 
            className="text-2xl sm:text-3xl lg:text-4xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed"
            style={{ 
              transform: `translateY(${scrollY * 0.05}px)`
            }}
          >
            Where brilliant minds connect, collaborate, and create the future together. 
          </p>
          <div 
            className="text-2xl sm:text-3xl lg:text-4xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed"
            style={{ 
              transform: `translateY(${scrollY * 0.05}px)`
            }}
          >
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">A hub for </span>
            <span 
              key={currentRoleIndex}
              className="gradient-text typing-text"
              style={{ 
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
          <div className="w-3 h-3 gradient-bg rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 gradient-bg rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 gradient-bg rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </section>

      {/* Comfy's House Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="p-6 rounded-3xl bg-white/3 backdrop-blur-md border border-white/10">
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
                { number: "40+", label: "Art Pieces", path: "/comfy" },
                { number: "12+", label: "Videos", path: "/art/invideo" }
              ].map((stat, index) => (
                <Link 
                  key={index}
                  to={stat.path}
                  className="block p-3 md:p-4 rounded-xl bg-white/3 backdrop-blur-md border border-white/10 hover:scale-105 transition-all duration-300 hover:border-primary-500/50 cursor-pointer"
                  style={{ 
                    transform: `translateY(${scrollY * 0.01}px)`
                  }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold gradient-text animate-gradient mb-1">{stat.number}</div>
                  <div className="text-sm sm:text-base md:text-lg font-semibold gradient-text animate-gradient">{stat.label}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Circular Scrollable Tabs → Replaced with Carousel */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Explore Carousel (no header/subtext) */}
            <div className="relative w-full max-w-4xl h-56 md:h-72 mx-auto flex items-center justify-center">
              {/* Side previews */}
              {[-1, 1].map((offset) => {
                const item = getExploreAt(offset)
                const isLeft = offset === -1
                return (
                  <Link
                    key={offset}
                    to={item.path}
                    className={`absolute ${isLeft ? 'left-1/2 -translate-x-[70%]' : 'left-1/2 -translate-x-[30%]'} -translate-y-1/2 top-1/2 pointer-events-auto`}
                  >
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/40 backdrop-blur-sm flex flex-col items-center justify-center text-center transition-all duration-300 opacity-25 scale-75">
                      <item.Icon className="w-8 h-8 md:w-10 md:h-10 text-primary-300 mb-2" />
                      <span className="text-xs md:text-sm font-semibold text-gray-200 leading-tight">
                        {item.label}
                      </span>
                    </div>
                  </Link>
                )
              })}

              {/* Main item */}
              {(() => {
                const item = getExploreAt(0)
                return (
                  <Link
                    to={item.path}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 pointer-events-auto"
                  >
                    <div className="w-40 h-40 md:w-60 md:h-60 rounded-full bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700/50 backdrop-blur-sm flex flex-col items-center justify-center text-center transition-all duration-300 opacity-100 scale-100 shadow-2xl">
                      <item.Icon className="w-16 h-16 md:w-24 md:h-24 text-primary-300 mb-3" />
                      <span className="text-sm md:text-lg font-semibold text-gray-100 leading-tight">
                        {item.label}
                      </span>
                    </div>
                  </Link>
                )
              })()}

              {/* Arrows (faint) */}
              <button
                aria-label="Previous"
                onClick={showPrevExplore}
                className="absolute left-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-900/40 border border-gray-700/40 text-white opacity-30 hover:opacity-60 transition pointer-events-auto"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                aria-label="Next"
                onClick={showNextExplore}
                className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-900/40 border border-gray-700/40 text-white opacity-30 hover:opacity-60 transition pointer-events-auto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>
 
      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Members" },
              { number: "50+", label: "Projects" },
              { number: "25+", label: "Events" },
              { number: "100%", label: "Awesome" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="glass p-6 rounded-xl hover:scale-110 transition-transform duration-300"
                style={{ 
                  transform: `translateY(${scrollY * 0.01}px)`
                }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
            </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home