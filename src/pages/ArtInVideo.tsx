// React import not needed with new JSX transform
import { Video, Clock } from 'lucide-react'

const ArtInVideo = () => {
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
            <span className="gradient-text">InVideo</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            A space for community-created video content, tutorials, and creative showcases.
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-white/3 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Video className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Coming Soon</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We're building a platform where our community can share video tutorials, creative processes, and showcase their artistic journey. 
              Stay tuned for updates!
            </p>
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <Clock className="w-5 h-5" />
              <span>In development</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ArtInVideo 