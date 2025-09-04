import React, { useState } from 'react'
import { Download, X } from 'lucide-react'

const Comfy = () => {
  const [selectedImage, setSelectedImage] = useState<{name: string, filename: string} | null>(null)

  // List of all images from public/comfy folder
  const comfyImages = [

    { name: 'crazy', filename: 'crazy.webp' },
    { name: 'playboi carti', filename: 'pc.webp' },
    { name: 'wow', filename: 'wow.webp' },
    { name: 'uncm', filename: 'cm_-cm.gif' },
    { name: 'Poker', filename: 'poker.webp' },
    { name: 'CS16', filename: 'cs16.webp' },
    { name: 'emm..', filename: 'emm.webp' },
    { name: 'coffee', filename: 'cm.webp' },
    { name: 'hey', filename: 'hey.webp' },
    { name: 'chef', filename: 'GtZMljIXQAAOt2G.webp' },
    { name: 'grass', filename: 'GtZCHINb0AACey_.webp' },
    { name: 'cute', filename: 'GtMsUysXAAA7pLX.webp' },
    { name: 'comfy vs pepe', filename: 'fight.webp' },
    { name: 'cute', filename: 'skin_3.webp' },
    { name: 'vampire', filename: 'skin_4.webp' },
    { name: 'skull', filename: 'cleaned_image.webp' },
    { name: 'milday', filename: 'incosticker.webp' },
    { name: 'private', filename: 'GsVzeA5WEAAatw5.webp' },
    { name: 'CM', filename: 'cmpng.webp' },
    { name: 'cute', filename: 'inco11.webp' },
    { name: 'cleaning', filename: 'Inco_Resized_Vashing_Animated.gif' },
    { name: 'silento', filename: 'Inco_Resized_SIGMA_animanted.gif' },
    { name: 'gn', filename: 'Inco_Resized_GNV2.0_Animated.gif' },
    { name: 'angry', filename: 'Без_имени-5.webp' },
    { name: 'love', filename: 'Без_имени-4.webp' },
    { name: 'artist', filename: 'Без_имени-3.webp' },
    { name: 'boxer', filename: 'tyson.webp' },
    { name: 'muscles', filename: 'muscles.webp' },
    { name: 'mag', filename: 'magician.webp' },
    { name: 'bersek', filename: 'guts.webp' },
    { name: 'gangster', filename: 'armored_(1).webp' },
    { name: 'alch', filename: 'alch.webp' },
    { name: ': 333', filename: 'GruehmWXoAETIof.webp' },
    { name: 'gun', filename: 'photo_2025-05-26_20-17-43.webp' },
    { name: 'explorer', filename: 'photo_2025-05-26_20-17-40.webp' },
    { name: 'sad', filename: 'photo_2025-05-26_20-17-36.webp' },
    { name: 'lazy', filename: 'photo_2025-05-26_20-17-33.webp' },
    { name: 'wine', filename: 'photo_2025-05-26_20-17-27.webp' },
    { name: 'angry', filename: 'облако2.webp' },
    { name: 'fun', filename: 'облако1.webp' },
    { name: ': 3', filename: 'облако4.webp' },
    { name: 'inco comfy 3', filename: 'облако3.webp' },
    { name: 'comfy original', filename: 'cloud__1_ (1).webp' },
    { name: 'vibecoding', filename: 'image_(3).webp' },
    { name: 'Quiz', filename: 'quiz.webp' },
    { name: 'Community', filename: 'community.webp' },
    { name: 'Poker', filename: 'poker (1).webp' },
    { name: 'Chess', filename: 'chess_(1).webp' },
  ]

  const handleDownload = (filename: string, name: string) => {
    const link = document.createElement('a')
    link.href = `/comfy/${filename}`
    link.download = `${name}.${filename.split('.').pop()}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const openFullscreen = (image: {name: string, filename: string}) => {
    setSelectedImage(image)
  }

  const closeFullscreen = () => {
    setSelectedImage(null)
  }

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            <span className="gradient-text">Comfy</span> Collection
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Browse through our collection of comfy images and artwork.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {comfyImages.map((image, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/3 backdrop-blur-md border border-white/10 p-8 rounded-xl card-hover mb-3">
                <img 
                  src={`/comfy/${image.filename}`}
                  alt={image.name}
                  className="w-full h-56 object-cover rounded-lg mb-4 cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => openFullscreen(image)}
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-image.jpg'
                  }}
                />
                
                <div className="flex items-center justify-center space-x-2">
                  <h3 className="text-base font-medium text-white truncate">
                    {image.name}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDownload(image.filename, image.name)
                    }}
                    className="p-1 hover:bg-primary-500/20 rounded-full transition-all duration-300 hover:scale-110"
                    title="Download image"
                  >
                    <Download className="w-4 h-4 text-primary-400 hover:text-white" />
                  </button>
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
              <span className="text-gray-300 font-semibold text-sm sm:text-base">{comfyImages.length} Images</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-600"></div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span className="text-gray-300 font-semibold text-sm sm:text-base">Comfy Collection</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-600"></div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span className="text-gray-300 font-semibold text-sm sm:text-base">Always Growing</span>
            </div>
          </div>
        </div>

        {/* Fullscreen Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeFullscreen}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <button
                onClick={closeFullscreen}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              
              <img 
                src={`/comfy/${selectedImage.filename}`}
                alt={selectedImage.name}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <h3 className="text-white text-xl font-semibold bg-black/50 px-4 py-2 rounded-lg">
                  {selectedImage.name}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDownload(selectedImage.filename, selectedImage.name)
                  }}
                  className="p-3 bg-primary-500/80 hover:bg-primary-500 rounded-full transition-all duration-300 hover:scale-110"
                  title="Download image"
                >
                  <Download className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Comfy