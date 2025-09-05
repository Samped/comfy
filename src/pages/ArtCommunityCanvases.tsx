import { useMemo, useState } from 'react'

const ArtCommunityCanvases = () => {
  const [selectedImage, setSelectedImage] = useState<{ name: string; url: string } | null>(null)
  
  // Custom canvas titles
  const customTitles = [
    'InCreatives #2 (everything worked fine lol)',
    'InCreatives #1 (we broke excalidraw)'
  ]
  
  // Load all images from public/community canvas as URLs (Vite)
  const canvasImages = useMemo(() => {
    const modules = import.meta.glob('/public/community canvas/*', { eager: true, as: 'url' }) as Record<string, string>
    const items = Object.entries(modules).map(([path, url], index) => {
      const name = path.split('/').pop() || 'canvas'
      // Use custom titles if available, otherwise use filename without extension
      const displayName = customTitles[index] || name.replace(/\.(png|jpg|jpeg|gif|webp)$/i, '')
      return { name: displayName, url }
    })
    return items.sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  return (
    <div className="pt-16 min-h-screen" style={{ backgroundColor: '#0f172a' }}>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Community</span>
            <span className="text-white"> Canvases</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Shared canvases from our community.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">

          {canvasImages.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Canvases Found</h3>
              <p className="text-gray-400">Check back later for community canvas art!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {canvasImages.map((item, index) => (
                <div key={index} className="group">
                  <div className="bg-white/3 backdrop-blur-md border border-white/10 p-6 rounded-2xl card-hover relative overflow-hidden">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
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
        </div>
      </section>

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
  )
}

export default ArtCommunityCanvases 