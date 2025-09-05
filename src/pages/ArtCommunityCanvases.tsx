import React, { useMemo, useState } from 'react'

const ArtCommunityCanvases = () => {
  const [selectedImage, setSelectedImage] = useState<{ name: string; url: string } | null>(null)
  // Load all images from public/community canvas as URLs (Vite)
  const canvasImages = useMemo(() => {
    const modules = import.meta.glob('/public/community canvas/*', { eager: true, as: 'url' }) as Record<string, string>
    const items = Object.entries(modules).map(([path, url]) => {
      const name = path.split('/').pop() || 'canvas'
      // Remove file extension from display name
      const displayName = name.replace(/\.(png|jpg|jpeg|gif|webp)$/i, '')
      return { name: displayName, url }
    })
    return items.sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  return (
    <div className="pt-16 min-h-screen relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-4xl font-bold">
            <span className="gradient-text">Community Canvases</span>
          </h1>
          <p className="text-gray-300-xl  max-w-3xl mx-auto">Shared canvases from our community.</p>
        </div>

        {canvasImages.length === 0 ? (
          <div className="text-center text-gray-400">No images found in /public/community canvas</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {canvasImages.map((item, index) => (
              <div key={index} className="group">
                <div className="bg-white/3 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-2xl card-hover relative overflow-hidden">
                  <div className="text-center mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                      {item.name}
                    </h3>
                  </div>
                  <div className="relative">
                    <img 
                      src={item.url}
                      alt={item.name}
                      className="w-full h-64 object-contain rounded-xl transition-transform duration-300 group-hover:scale-105 bg-black/20 cursor-pointer"
                      onClick={() => setSelectedImage(item)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Fullscreen Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white text-2xl font-bold bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors z-10"
              >
                ×
              </button>
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.name}</h2>
              </div>
              <img 
                src={selectedImage.url}
                alt={selectedImage.name}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArtCommunityCanvases 