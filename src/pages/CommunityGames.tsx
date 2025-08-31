import React from 'react'
import { Gamepad2, Users, Star, Download, Play } from 'lucide-react'

const CommunityGames = () => {
  const games = [
    {
      name: 'Pixel Adventure Quest',
      description: 'A retro-style platformer with pixel art graphics and challenging levels.',
      developer: 'Alex Chen',
      players: 1500,
      rating: 4.8,
      genre: 'Platformer',
      image: '🎮',
      status: 'Released'
    },
    {
      name: 'Cosmic Defender',
      description: 'Space shooter with beautiful particle effects and intense boss battles.',
      developer: 'Sarah Kim',
      players: 2300,
      rating: 4.9,
      genre: 'Shooter',
      image: '🚀',
      status: 'Released'
    },
    {
      name: 'Mystic Puzzle Realm',
      description: 'Brain-teasing puzzle game with mystical themes and beautiful artwork.',
      developer: 'Marcus Rodriguez',
      players: 1800,
      rating: 4.7,
      genre: 'Puzzle',
      image: '🧩',
      status: 'Beta'
    },
    {
      name: 'Neon Racing Circuit',
      description: 'Futuristic racing game with neon graphics and high-speed action.',
      developer: 'Emma Wilson',
      players: 3200,
      rating: 4.6,
      genre: 'Racing',
      image: '🏎️',
      status: 'Released'
    }
  ]

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Community <span className="gradient-text">Games</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover amazing games created by our talented community members. 
            From platformers to puzzles, there's something for every gamer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {games.map((game, index) => (
            <div key={index} className="glass p-8 rounded-2xl card-hover">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-4xl">{game.image}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{game.name}</h3>
                    <p className="text-primary-400 text-sm">by {game.developer}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  game.status === 'Released' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {game.status}
                </span>
              </div>
              
              <p className="text-gray-300 mb-6">{game.description}</p>
              
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 bg-primary-500/20 text-primary-300 text-sm rounded-full border border-primary-500/30">
                  {game.genre}
                </span>
                <div className="flex items-center space-x-4 text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{game.players.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">{game.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 transform hover:scale-105">
                  <Play className="w-4 h-4" />
                  <span>Play Now</span>
                </button>
                <button className="px-4 py-2 glass text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="glass p-8 rounded-2xl inline-block">
            <h2 className="text-2xl font-bold text-white mb-4">Have a Game to Share?</h2>
            <p className="text-gray-300 mb-6">
              Join our community of game developers and showcase your creations!
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300">
              Submit Your Game
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityGames 