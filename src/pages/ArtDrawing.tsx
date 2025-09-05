import { Heart, Share2, Download, Eye, Star } from 'lucide-react'

const ArtDrawing = () => {
  const drawings = [
    {
      title: 'Whimsical Forest Friends',
      artist: 'Emma Wilson',
      description: 'Adorable forest creatures in a magical woodland setting with soft, dreamy colors.',
      likes: 567,
      views: 2100,
      category: 'Digital Drawing',
      image: '🦊',
      tags: ['whimsical', 'forest', 'magical', 'creatures'],
      rating: 4.9
    },
    {
      title: 'Urban Sketch Collection',
      artist: 'David Park',
      description: 'A series of quick urban sketches capturing the energy of city life.',
      likes: 423,
      views: 1800,
      category: 'Sketch',
      image: '🏙️',
      tags: ['urban', 'sketch', 'city', 'energy'],
      rating: 4.7
    },
    {
      title: 'Fantasy Character Portrait',
      artist: 'Sarah Kim',
      description: 'A detailed fantasy character with intricate costume design and magical elements.',
      likes: 789,
      views: 3200,
      category: 'Character Design',
      image: '🧙‍♀️',
      tags: ['fantasy', 'character', 'portrait', 'magical'],
      rating: 4.8
    },
    {
      title: 'Nature Study: Autumn Leaves',
      artist: 'Alex Chen',
      description: 'Detailed study of autumn leaves with beautiful fall colors and textures.',
      likes: 345,
      views: 1500,
      category: 'Nature Study',
      image: '🍂',
      tags: ['nature', 'autumn', 'leaves', 'study'],
      rating: 4.6
    },
    {
      title: 'Abstract Emotions',
      artist: 'Lisa Thompson',
      description: 'Abstract representation of human emotions through color and form.',
      likes: 456,
      views: 1900,
      category: 'Abstract',
      image: '🎨',
      tags: ['abstract', 'emotions', 'color', 'form'],
      rating: 4.5
    },
    {
      title: 'Manga Style Scene',
      artist: 'Marcus Rodriguez',
      description: 'Dynamic manga-style scene with expressive characters and action.',
      likes: 678,
      views: 2800,
      category: 'Manga',
      image: '⚡',
      tags: ['manga', 'dynamic', 'action', 'expressive'],
      rating: 4.8
    }
  ]

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Community <span className="gradient-text">Drawings</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore amazing drawings created by our talented community artists. 
            From sketches to detailed illustrations, discover unique artistic perspectives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {drawings.map((drawing, index) => (
            <div key={index} className="glass p-6 rounded-2xl card-hover">
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">{drawing.image}</div>
                <h3 className="text-xl font-semibold text-white mb-1">{drawing.title}</h3>
                <p className="text-primary-400 text-sm mb-2">by {drawing.artist}</p>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="px-3 py-1 bg-secondary-500/20 text-secondary-300 text-sm rounded-full border border-secondary-500/30">
                    {drawing.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm">{drawing.rating}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4 text-center">{drawing.description}</p>
              
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {drawing.tags.map((tag, tagIndex) => (
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
                  <span>{drawing.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{drawing.views}</span>
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
            <h2 className="text-2xl font-bold text-white mb-4">Share Your Drawings</h2>
            <p className="text-gray-300 mb-6">
              Have amazing drawings to showcase? Share your artistic talent with our community!
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300">
              Submit Your Drawing
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtDrawing 