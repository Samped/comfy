import React from 'react'
import { Heart, Share2, Download, Eye, Star, MessageCircle } from 'lucide-react'

const ArtMeme = () => {
  const memes = [
    {
      title: 'Developer Life Meme',
      creator: 'Alex Chen',
      description: 'Classic programming humor that every developer can relate to.',
      likes: 892,
      views: 4500,
      category: 'Programming',
      image: '😅',
      tags: ['programming', 'developer', 'humor', 'coding'],
      rating: 4.8,
      comments: 45
    },
    {
      title: 'Designer Struggle',
      creator: 'Sarah Kim',
      description: 'The eternal battle between designers and clients.',
      likes: 567,
      views: 3200,
      category: 'Design',
      image: '🎨',
      tags: ['design', 'client', 'struggle', 'humor'],
      rating: 4.6,
      comments: 32
    },
    {
      title: 'Gaming Moments',
      creator: 'David Park',
      description: 'Those epic gaming fails that make you laugh and cry.',
      likes: 1234,
      views: 7800,
      category: 'Gaming',
      image: '🎮',
      tags: ['gaming', 'fails', 'epic', 'funny'],
      rating: 4.9,
      comments: 67
    },
    {
      title: 'Student Life',
      creator: 'Emma Wilson',
      description: 'The relatable struggles of being a student.',
      likes: 456,
      views: 2100,
      category: 'Student',
      image: '📚',
      tags: ['student', 'struggles', 'relatable', 'funny'],
      rating: 4.5,
      comments: 28
    },
    {
      title: 'Tech Support',
      creator: 'Marcus Rodriguez',
      description: 'The classic tech support conversation.',
      likes: 789,
      views: 4100,
      category: 'Tech Support',
      image: '💻',
      tags: ['tech support', 'IT', 'classic', 'humor'],
      rating: 4.7,
      comments: 41
    },
    {
      title: 'Social Media Life',
      creator: 'Lisa Thompson',
      description: 'The reality vs. social media facade.',
      likes: 678,
      views: 3600,
      category: 'Social Media',
      image: '📱',
      tags: ['social media', 'reality', 'funny', 'relatable'],
      rating: 4.6,
      comments: 35
    }
  ]

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Community <span className="gradient-text">Memes</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover hilarious memes created by our community. 
            From programming jokes to relatable life moments, laugh along with fellow creators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {memes.map((meme, index) => (
            <div key={index} className="glass p-6 rounded-2xl card-hover">
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">{meme.image}</div>
                <h3 className="text-xl font-semibold text-white mb-1">{meme.title}</h3>
                <p className="text-primary-400 text-sm mb-2">by {meme.creator}</p>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="px-3 py-1 bg-secondary-500/20 text-secondary-300 text-sm rounded-full border border-secondary-500/30">
                    {meme.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm">{meme.rating}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4 text-center">{meme.description}</p>
              
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {meme.tags.map((tag, tagIndex) => (
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
                  <span>{meme.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{meme.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{meme.comments}</span>
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
            <h2 className="text-2xl font-bold text-white mb-4">Share Your Memes</h2>
            <p className="text-gray-300 mb-6">
              Have a funny meme to share? Make the community laugh with your creativity!
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300">
              Submit Your Meme
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtMeme 