import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Lightbulb, Rocket, Star } from 'lucide-react'

const Home = () => {
  const [scrollY, setScrollY] = useState(0)
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const roles = ['dreamers', 'artists', 'designers', 'makers', 'coders', 'builders', 'you']

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

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                           <h1 
                   className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-8"
                   style={{ 
                     transform: `translateY(${scrollY * 0.1}px)`
                   }}
                 >
                   <span className="gradient-text animate-gradient">Comfy Verse</span>
            <br />
                   <span className="text-white">Community Page</span>
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
          <div className="w-3 h-3 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </section>

      {/* Comfy's House Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass p-6 rounded-3xl border border-gray-700/50 backdrop-blur-sm">
            <div className="text-center mb-6 mt-4">
              <h2 
                className="text-4xl sm:text-5xl font-black text-white mb-2 animate-pulse-slow"
                style={{ 
                  textShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
                }}
              >
                Comfy's House
            </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { number: "15+", label: "Community Games", path: "/community-games" },
                { number: "25+", label: "Comfy Art", path: "/comfy" },
                { number: "40+", label: "Art Pieces", path: "/art/drawing" },
                { number: "12+", label: "Videos", path: "/art/invideo" }
              ].map((stat, index) => (
                <Link 
                  key={index}
                  to={stat.path}
                  className="block p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/30 hover:scale-105 transition-all duration-300 hover:border-primary-500/50 cursor-pointer"
                  style={{ 
                    transform: `translateY(${scrollY * 0.01}px)`
                  }}
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2 animate-pulse-slow">{stat.number}</div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </Link>
              ))}
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