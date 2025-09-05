import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Users, Gamepad2, Palette, Home, ChevronDown, BookOpen } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isArtDropdownOpen, setIsArtDropdownOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: Home, customIcon: null },
    { path: '/community-games', label: 'Community Games', icon: Gamepad2, customIcon: null },
    { path: '/comfy', label: 'Comfy', icon: null, customIcon: 'cloud__1_.webp' },
    { path: '/blog', label: 'Blog', icon: BookOpen, customIcon: null },
  ]

  const artDropdownItems = [
    { path: '/art/invideo', label: 'InVideo' },
    { path: '/art/meme', label: 'Meme' },
    { path: '/art/community-canvases', label: 'Community Canvases' },
  ]

  const isActive = (path: string) => location.pathname === path
  const isArtActive = (path: string) => location.pathname.startsWith('/art')

  return (
    <nav className="fixed top-0 w-full z-50 glass animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src="/comfy.webp" 
              alt="Comfy Verse Logo" 
              className="w-12 h-12 object-cover transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" 
            />
            <span className="text-xl font-bold gradient-text group-hover:animate-wiggle transition-all duration-300">
              Comfy Verse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 hover-lift ${
                    isActive(item.path)
                      ? 'text-primary-400 bg-primary-400/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.customIcon ? (
                    <img 
                      src={`/${item.customIcon}`} 
                      alt={item.label}
                      className="w-5 h-5 object-contain"
                    />
                  ) : (
                    Icon ? <Icon className="w-5 h-5" /> : null
                  )}
                  <span>{item.label}</span>
                </Link>
              )
            })}
            
            {/* Art Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsArtDropdownOpen(!isArtDropdownOpen)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 hover-lift ${
                  isArtActive('/art')
                    ? 'text-primary-400 bg-primary-400/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/10 hover-glow'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>Art</span>
                <ChevronDown className={`w-6 h-4 transition-transform duration-300 ${isArtDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {isArtDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 glass rounded-lg shadow-lg z-50 animate-fade-in">
                  <div className="py-2">
                    {artDropdownItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsArtDropdownOpen(false)}
                        className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                          isActive(item.path)
                            ? 'text-primary-400 bg-primary-400/10'
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 transition-all duration-300 hover:scale-110 hover:rotate-12"
            >
              {isOpen ? (
                <X className="w-6 h-6 animate-fade-in" />
              ) : (
                <Menu className="w-6 h-6 animate-fade-in" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:scale-105 hover-lift ${
                      isActive(item.path)
                        ? 'text-primary-400 bg-primary-400/10 animate-pulse-glow'
                        : 'text-gray-300 hover:text-white hover:bg-white/10 hover-glow'
                    }`}
                    style={{ 
                      animation: `slideInLeft 0.3s ease-out ${index * 0.1}s both` 
                    }}
                  >
                    {item.customIcon ? (
                      <img 
                        src={`/${item.customIcon}`} 
                        alt={`${item.label} icon`} 
                        className="w-5 h-5 object-contain animate-float" 
                      />
                    ) : Icon && (
                      <Icon className="w-5 h-5 animate-float" />
                    )}
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              
              {/* Mobile Art Section */}
              <div className="px-3 py-2">
                <div className="text-gray-400 text-sm font-medium mb-2">Art</div>
                {artDropdownItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-6 py-2 text-sm transition-colors duration-200 ${
                      isActive(item.path)
                        ? 'text-primary-400 bg-primary-400/10 rounded'
                        : 'text-gray-300 hover:text-white hover:bg-white/10 rounded'
                    }`}
                    style={{ 
                      animation: `slideInLeft 0.3s ease-out ${(index + 3) * 0.1}s both` 
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 