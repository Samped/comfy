import { useState, useEffect } from 'react'
import { Play, ExternalLink, Gamepad2 } from 'lucide-react'

const CommunityGames = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const games = [
    {
      name: 'ComfyGame',
      developer: '@nftholderamb',
      image: 'poker.webp',
      playLink: 'https://holderamb.github.io/inco/'
    },
    {
      name: 'Inco Puzzle',
      developer: '@3ttagg',
      image: 'telegram-cloud-document-2-5443156369416945026.webp',
      playLink: 'https://ettagg.github.io/inco/'
    },

    {
      name: 'Rabio Adventure',
      developer: '@eddy_phos',
      image: 'telegram-cloud-document-2-5370592141036777467.webp',
      playLink: 'https://rabio.vercel.app/'
    },
    {
      name: 'Cloud Jump',
      developer: 'Vasyl_Hunia_8',
      image: 'telegram-cloud-document-2-5212957873381865779.webp',
      playLink: 'https://vasyl808.github.io/web_game/'
    },

    {
      name: 'Cloud-Cascade Challenge',
      developer: '@zhukv197',
      image: 'telegram-cloud-document-2-5458444919687379195.webp',
      playLink: 'https://harmonious-queijadas-8b5fed.netlify.app/'
    },
    {
      name: 'Comfy Runner',
      developer: '@kungfumode',
      image: 'telegram-cloud-document-2-5388958370382247511.webp',
      playLink: 'https://kungfumodeee.github.io/comfy-runner/'
    },

    {
      name: 'Cloud Flyer',
      developer: '@HiuTrnNh7',
      image: 'telegram-cloud-document-2-5373184493102332174.webp',
      playLink: 'https://hiutrann.github.io/flappinco/flappinco.html'
    },
    {
      name: 'IncofyApp',
      developer: '@arpanberwal',
      image: 'telegram-cloud-document-2-5197467992224463197.webp',
      playLink: 'https://incofy.netlify.app/'
    },
    {
      name: 'Flappy Cloud',
      developer: '@glory4ik',
      image: 'telegram-cloud-document-2-5458613647477602558.webp',
      playLink: 'https://t.co/FxN0miPOEW'
    },
    {
      name: 'Inco Balls ',
      developer: '@BaTrinh99',
      image: 'telegram-cloud-document-2-5453885365226076330.webp',
      playLink: 'https://boisterous-froyo-b705f5.netlify.app/v6'
    },
    {
      name: 'Inco Hunter',
      developer: '@__Sane4ek__',
      image: 'telegram-cloud-document-2-5453885365226076316.webp',
      playLink: 'https://incohunt.netlify.app/'
    },
    {
      name: 'Dandadadan',
      developer: '@gonichigo33',
      image: 'telegram-cloud-document-2-5454042105762578739.webp',
      playLink: 'https://dandadadan.netlify.app/'
    },
    {
      name: 'Inco Racer',
      developer: '@Oleg__StaR',
      image: 'telegram-cloud-document-2-5453885365226076306.webp',
      playLink: 'https://inco-racing.vercel.app/'
    },
    {
      name: 'Inco Scopter',
      developer: '@xiaoqingling98',
      image: 'telegram-cloud-document-2-5443156369416945062.webp',
      playLink: 'https://dulcet-cat-679925.netlify.app/'
    },
    {
      name: 'Comfy Ninja',
      developer: '@xiaoqingling98',
      image: 'telegram-cloud-document-2-5453885365226076340.webp',
      playLink: 'https://nimble-cactus-76945b.netlify.app/'
    },
    {
      name: 'EatComfy',
      developer: '@nftholderamb',
      image: 'image.webp',
      playLink: 'https://holderamb.github.io/eatcomfy/'
    },
    {
      name: 'Incodresser',
      developer: '@HiuTrnNh7',
      image: 'telegram-cloud-document-2-5434080712678473053.webp',
      playLink: 'https://incodresser.netlify.app/inco_dresser.html'
    },
    {
      name: 'Comfy: The Crypto Tycoon',
      developer: '@mianyituo',
      image: 'telegram-cloud-document-2-5388958370382247505.webp',
      playLink: 'https://adagurkan.github.io/lildegengame/'
    },
  ]

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/10 to-purple-900/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ 
            transform: `translate(${Math.sin(scrollY * 0.01) * 30}px, ${scrollY * 0.02}px)`,
            animation: 'float 8s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute top-40 right-32 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ 
            transform: `translate(${Math.cos(scrollY * 0.008) * 40}px, ${scrollY * -0.01}px)`,
            animation: 'float 6s ease-in-out infinite reverse'
          }}
        />
        <div 
          className="absolute bottom-32 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ 
            transform: `translate(${Math.sin(scrollY * 0.005) * 50}px, ${scrollY * 0.015}px)`,
            animation: 'float 10s ease-in-out infinite'
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-8">
            <Gamepad2 className="w-12 h-12 text-primary-400 mr-4 animate-pulse" />
            <h1 className="text-4xl sm:text-5xl font-bold">
              <span className="gradient-text">Community Games</span>
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover amazing games created by our talented community developers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {games.map((game, index) => (
            <div key={index} className="group">
              <div className="bg-white/3 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-2xl card-hover relative overflow-hidden">
                {/* Game Name aligned to the left */}
                <div className="text-left mb-4">
                  <h3 className="text-base md:text-lg font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                    {game.name}
                  </h3>
                </div>

                {/* Game Image */}
                <div className="relative mb-4 md:mb-6">
                  <img 
                    src={`/community-game/${game.image}`}
                    alt={game.name}
                    className="w-full h-48 md:h-64 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-image.jpg'
                    }}
                  />
                  
                  {/* Smaller Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => window.open(game.playLink, '_blank')}
                      className="text-white px-3 md:px-4 py-2 rounded-full font-semibold flex items-center space-x-2 hover:scale-110 transition-transform duration-300 shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, #1B3E86 0%, #3673F5 20%, #8EB1F9 40%, #E7EEFE 60%)'
                      }}
                    >
                      <Play className="w-3 md:w-4 h-3 md:h-4" />
                      <span className="text-xs md:text-sm">Play</span>
                    </button>
                  </div>
                </div>
                
                {/* Developer Info and Play Button on same line */}
                <div className="flex items-center justify-center mb-4 md:mb-6">
                  <div className="flex items-center justify-between w-full max-w-sm md:max-w-md">
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <Gamepad2 className="w-3 md:w-4 h-3 md:h-4 text-primary-400" />
                      <a 
                        href={`https://x.com/${game.developer.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 font-medium text-xs md:text-sm hover:text-white transition-colors duration-300"
                      >
                        {game.developer}
                      </a>
                    </div>
                    
                    <button
                      onClick={() => window.open(game.playLink, '_blank')}
                      className="text-white font-bold py-2 md:py-3 px-3 md:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-1 md:space-x-2 shadow-lg h-10 md:h-12"
                      style={{
                        background: 'linear-gradient(135deg, #1B3E86 10%, #3673F5 60%, #8EB1F9 40%)'
                      }}
                    >
                      <Play className="w-3 md:w-4 h-3 md:h-4" />
                      <span className="text-xs md:text-sm">Play</span>
                      <ExternalLink className="w-2 md:w-3 h-2 md:h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Stats Bar */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-8 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl px-4 sm:px-8 py-3 sm:py-4 border border-gray-700/50">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300 font-semibold text-sm sm:text-base">{games.length} Games</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-600"></div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span className="text-gray-300 font-semibold text-sm sm:text-base">Active Community</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-600"></div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span className="text-gray-300 font-semibold text-sm sm:text-base">Always Growing</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default CommunityGames