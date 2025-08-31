import React from 'react'
import { Palette, Heart, Share2, Download, Eye } from 'lucide-react'

const Comfy = () => {
  const comfyArt = [
    {
      title: 'Cozy Cottage Dreams',
      artist: 'Emma Wilson',
      description: 'A warm, inviting cottage scene with soft lighting and comfortable vibes.',
      likes: 342,
      views: 1200,
      category: 'Digital Art',
      image: '🏡',
      tags: ['cozy', 'cottage', 'warm', 'comfortable']
    },
    {
      title: 'Rainy Day Comfort',
      artist: 'David Park',
      description: 'A peaceful rainy day scene with warm blankets and hot tea vibes.',
      likes: 287,
      views: 980,
      category: 'Illustration',
      image: '🌧️',
      tags: ['rainy', 'peaceful', 'warm', 'tea']
    },
    {
      title: 'Sunset Serenity',
      artist: 'Lisa Thompson',
      description: 'A calming sunset landscape that brings peace and tranquility.',
      likes: 456,
      views: 1500,
      category: 'Landscape',
      image: '🌅',
      tags: ['sunset', 'serene', 'peaceful', 'nature']
    },
    {
      title: 'Morning Coffee Bliss',
      artist: 'Alex Chen',
      description: 'The perfect morning coffee moment captured in warm, inviting colors.',
      likes: 389,
      views: 1100,
      category: 'Still Life',
      image: '☕',
      tags: ['coffee', 'morning', 'warm', 'inviting']
    },
    {
      title: 'Forest Sanctuary',
      artist: 'Sarah Kim',
      description: 'A magical forest scene that feels like a safe, comfortable haven.',
      likes: 523,
      views: 1800,
      category: 'Fantasy',
      image: '🌲',
      tags: ['forest', 'magical', 'safe', 'haven']
    },
    {
      title: 'Book Nook Corner',
      artist: 'Marcus Rodriguez',
      description: 'A cozy reading corner that makes you want to curl up with a good book.',
      likes: 298,
      views: 950,
      category: 'Interior',
      image: '📚',
      tags: ['reading', 'cozy', 'books', 'corner']
    }
  ]

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            <span className="gradient-text">Comfy</span> Art
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the most comfortable and cozy artwork created by our community. 
            Art that makes you feel warm, safe, and at peace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {comfyArt.map((art, index) => (
            <div key={index} className="glass p-6 rounded-2xl card-hover">
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">{art.image}</div>
                <h3 className="text-xl font-semibold text-white mb-1">{art.title}</h3>
                <p className="text-primary-400 text-sm mb-2">by {art.artist}</p>
                <span className="px-3 py-1 bg-secondary-500/20 text-secondary-300 text-sm rounded-full border border-secondary-500/30">
                  {art.category}
                </span>
              </div>
              
              <p className="text-gray-300 mb-4 text-center">{art.description}</p>
              
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {art.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-primary-500/20 text-primary-300 text-xs rounded-full border border-primary-500/30"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{art.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{art.views}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 transform hover:scale-105">
                  <Heart className="w-4 h-4" />
                  <span>Like</span>
                </button>
                <button className="px-3 py-2 glass text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="px-3 py-2 glass text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="glass p-8 rounded-2xl inline-block">
            <h2 className="text-2xl font-bold text-white mb-4">Share Your Comfy Art</h2>
            <p className="text-gray-300 mb-6">
              Have artwork that makes people feel comfortable and cozy? Share it with our community!
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300">
              Submit Your Art
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comfy 