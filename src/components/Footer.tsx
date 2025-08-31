import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="glass mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold gradient-text">Comfy Verse</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Building the future together through collaboration, innovation, and community. 
              Join us in creating something extraordinary.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li><Link to="/community-games" className="text-gray-300 hover:text-white transition-colors">Community Games</Link></li>
              <li><Link to="/comfy" className="text-gray-300 hover:text-white transition-colors">Comfy</Link></li>
              <li><Link to="/art/drawing" className="text-gray-300 hover:text-white transition-colors">Art - Drawing</Link></li>
              <li><Link to="/art/invideo" className="text-gray-300 hover:text-white transition-colors">Art - InVideo</Link></li>
              <li><Link to="/art/meme" className="text-gray-300 hover:text-white transition-colors">Art - Meme</Link></li>
              <li><Link to="/art/community-canvases" className="text-gray-300 hover:text-white transition-colors">Art - Community Canvases</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Comfy Verse Community Page. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 