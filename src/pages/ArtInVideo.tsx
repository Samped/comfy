import React from 'react'
import { Video, Heart, Share2, Download, Eye, Play, Clock } from 'lucide-react'

const ArtInVideo = () => {
  const videos = [
    {
      title: 'Digital Art Process: From Sketch to Final',
      artist: 'Emma Wilson',
      description: 'A complete walkthrough of creating digital artwork from initial sketch to finished piece.',
      likes: 892,
      views: 4500,
      duration: '15:32',
      category: 'Tutorial',
      image: '🎨',
      tags: ['digital art', 'tutorial', 'process', 'walkthrough'],
      thumbnail: '🖼️'
    },
    {
      title: 'Speed Painting: Fantasy Landscape',
      artist: 'David Park',
      description: 'Watch as a beautiful fantasy landscape comes to life in this speed painting video.',
      likes: 567,
      views: 3200,
      duration: '8:45',
      category: 'Speed Painting',
      image: '🏔️',
      tags: ['speed painting', 'fantasy', 'landscape', 'art'],
      thumbnail: '🖼️'
    },
    {
      title: 'Character Design Workshop',
      artist: 'Sarah Kim',
      description: 'Learn character design principles through this comprehensive workshop video.',
      likes: 1234,
      views: 7800,
      duration: '25:18',
      category: 'Workshop',
      image: '👤',
      tags: ['character design', 'workshop', 'tutorial', 'principles'],
      thumbnail: '🖼️'
    },
    {
      title: 'Art History: Renaissance Masters',
      artist: 'Alex Chen',
      description: 'An educational journey through the works of Renaissance art masters.',
      likes: 456,
      views: 2100,
      duration: '18:56',
      category: 'Educational',
      image: '🏛️',
      tags: ['art history', 'renaissance', 'educational', 'masters'],
      thumbnail: '🖼️'
    },
    {
      title: 'Digital Sculpting: 3D Character Creation',
      artist: 'Lisa Thompson',
      description: 'Step-by-step guide to creating 3D characters using digital sculpting tools.',
      likes: 789,
      views: 4100,
      duration: '32:15',
      category: '3D Art',
      image: '🗿',
      tags: ['3D', 'sculpting', 'character', 'digital'],
      thumbnail: '🖼️'
    },
    {
      title: 'Animation Basics: Frame by Frame',
      artist: 'Marcus Rodriguez',
      description: 'Learn the fundamentals of frame-by-frame animation with practical examples.',
      likes: 678,
      views: 3600,
      duration: '22:30',
      category: 'Animation',
      image: '🎬',
      tags: ['animation', 'frame by frame', 'basics', 'tutorial'],
      thumbnail: '🖼️'
    }
  ]

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Community <span className="gradient-text">Videos</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover amazing video content created by our community. 
            From tutorials to speed paintings, learn and be inspired by fellow artists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div key={index} className="glass p-6 rounded-2xl card-hover">
              <div className="relative mb-4">
                <div className="text-5xl text-center mb-3">{video.thumbnail}</div>
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{video.duration}</span>
                </div>
                <button className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-16 h-16 text-white" />
                </button>
              </div>
              
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-white mb-1">{video.title}</h3>
                <p className="text-primary-400 text-sm mb-2">by {video.artist}</p>
                <span className="px-3 py-1 bg-secondary-500/20 text-secondary-300 text-sm rounded-full border border-secondary-500/30">
                  {video.category}
                </span>
              </div>
              
              <p className="text-gray-300 mb-4 text-center">{video.description}</p>
              
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {video.tags.map((tag, tagIndex) => (
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
                  <span>{video.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{video.views.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 transform hover:scale-105">
                  <Play className="w-4 h-4" />
                  <span>Watch</span>
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
            <h2 className="text-2xl font-bold text-white mb-4">Share Your Videos</h2>
            <p className="text-gray-300 mb-6">
              Have amazing video content to share? Showcase your skills and help others learn!
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300">
              Submit Your Video
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtInVideo 