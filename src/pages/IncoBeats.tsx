import React from 'react'

const IncoBeats = () => {
  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">IncoBeats</h1>
          <p className="text-gray-300 mb-2">Music platform for the Inco community</p>
          <p className="text-gray-400 text-sm">
            Created by{" "}
            <a
              href="https://x.com/zhukv197"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200"
            >
              @zhukv197
            </a>
          </p>
        </div>
        
        <div className="w-full h-[calc(100vh-200px)] rounded-lg overflow-hidden shadow-2xl border border-gray-700">
          <iframe
            src="https://imaginative-gelato-a7d371.netlify.app/"
            className="w-full h-full border-0"
            title="IncoBeats Music Platform"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

export default IncoBeats 