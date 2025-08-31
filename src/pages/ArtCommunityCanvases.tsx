import React from 'react'
import { Palette, Heart, Share2, Download, Eye, Star, Users } from 'lucide-react'

const ArtCommunityCanvases = () => {
  const canvases = [
    {
      title: 'Collaborative Mural',
      creator: 'Community Team',
      description: 'A beautiful mural created by multiple community members working together.',
      likes: 1234,
      views: 8900,
      category: 'Collaborative',
      image: '🎨',
      tags: ['collaborative', 'mural', 'community', 'teamwork'],
      rating: 4.9,
      contributors: 15
    },
    {
      title: 'Digital Canvas Collection',
      creator: 'Various Artists',
      description: 'A collection of digital artworks from our community canvas sessions.',
      likes: 856,
      views: 5200,
      category: 'Digital Art',
      image: '🖼️',
      tags: ['digital', 'canvas', 'collection', 'various'],
      rating: 4.7,
      contributors: 8
    },
    {
      title: 'Interactive Art Wall',
      creator: 'Community',
      description: 'An interactive wall where anyone can add their artistic touch.',
      likes: 2345,
      views: 15600,
      category: 'Interactive',
      image: '🖼️',
      tags: ['interactive', 'wall', 'community', 'participation'],
      rating: 4.8,
      contributors: 25
    },
    {
      title: 'Seasonal Canvas',
      creator: 'Seasonal Artists',
      description: 'Canvas artworks that change with the seasons and community events.',
      likes: 678,
      views: 3800,
      category: 'Seasonal',
      image: '🍂',
      tags: ['seasonal', 'events', 'community', 'changing'],
      rating: 4.6,
      contributors: 12
    },
    {
      title: 'Themed Collaboration',
      creator: 'Theme Team',
      description: 'Community canvas based on monthly themes and challenges.',
      likes: 945,
      views: 6100,
      category: 'Themed',
      image: '🎯',
      tags: ['themed', 'challenges', 'monthly', 'collaboration'],
      rating: 4.7,
      contributors: 18
    },
    {
      title: 'Live Art Sessions',
      creator: 'Live Artists',
      description: 'Real-time collaborative canvas sessions with live streaming.',
      likes: 1567,
      views: 9200,
      category: 'Live',
      image: '📺',
      tags: ['live', 'streaming', 'real-time', 'collaborative'],
      rating: 4.8,
      contributors: 20
    }
  ]

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Community <span className="gradient-text">Canvases</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore collaborative artworks created by our community. 
            From interactive walls to themed collaborations, see what we create together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {canvases.map((canvas, index) => (
            <div key={index} className="glass p-6 rounded-2xl card-hover">
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">{canvas.image}</div>
                <h3 className="text-xl font-semibold text-white mb-1">{canvas.title}</h3>
                <p className="text-primary-400 text-sm mb-2">by {canvas.creator}</p>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="px-3 py-1 bg-secondary-500/20 text-secondary-300 text-sm rounded-full border border-secondary-500/30">
                    {canvas.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm">{canvas.rating}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4 text-center">{canvas.description}</p>
              
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {canvas.tags.map((tag, tagIndex) => (
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
                  <span>{canvas.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{canvas.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{canvas.contributors}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 transform hover:scale-105">
                  <Palette className="w-4 h-4" />
                  <span>Join Canvas</span>
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
            <h2 className="text-2xl font-bold text-white mb-4">Start a New Canvas</h2>
            <p className="text-gray-300 mb-6">
              Want to create a collaborative canvas? Start a new project and invite the community!
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300">
              Create Canvas
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtCommunityCanvases 