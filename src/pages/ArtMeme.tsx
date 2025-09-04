import React, { useMemo } from 'react'

const ArtMeme = () => {
  // Load all images from public/meme as URLs (Vite)
  const memeImages = useMemo(() => {
    const modules = import.meta.glob('/public/meme/*', { eager: true, as: 'url' }) as Record<string, string>
    const items = Object.entries(modules).map(([path, url]) => {
      const name = path.split('/').pop() || 'meme'
      return { name, url }
    })
    // Sort by name for stable order
    return items.sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  return (
    <div className="pt-16 min-h-screen relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold">
            <span className="gradient-text">Comfy Memes</span>
          </h1>
          <p className="text-gray-300 mt-2">A gallery of memes from our community.</p>
        </div>

        {memeImages.length === 0 ? (
          <div className="text-center text-gray-400">No memes found in /public/meme</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {memeImages.map((meme, index) => (
              <div key={index} className="group">
                <div className="bg-white/3 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-2xl card-hover relative overflow-hidden">
                  <div className="relative mb-4 md:mb-6">
                    <img 
                      src={meme.url}
                      alt={meme.name}
                      className="w-full h-64 object-contain rounded-xl transition-transform duration-300 group-hover:scale-105 bg-black/20"
                    />
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ArtMeme 