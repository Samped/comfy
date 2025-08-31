import React from 'react'
import { Github, ExternalLink, Users, Star } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      name: 'Comfy Verse Hub',
      description: 'A collaborative platform for community projects and knowledge sharing.',
      tech: ['React', 'Node.js', 'MongoDB'],
      stars: 128,
      contributors: 15,
      status: 'Active'
    },
    {
      name: 'Smart Contracts Library',
      description: 'Collection of audited smart contracts for DeFi applications.',
      tech: ['Solidity', 'Hardhat', 'TypeScript'],
      stars: 89,
      contributors: 8,
      status: 'Active'
    },
    {
      name: 'AI Chat Assistant',
      description: 'Intelligent chatbot powered by machine learning.',
      tech: ['Python', 'TensorFlow', 'FastAPI'],
      stars: 67,
      contributors: 12,
      status: 'Beta'
    }
  ]

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Our <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover innovative projects built by our community. From web apps to blockchain solutions, 
            we're creating the tools of tomorrow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="glass p-8 rounded-2xl card-hover">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white">{project.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <p className="text-gray-300 mb-6">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-primary-500/20 text-primary-300 text-sm rounded-full border border-primary-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">{project.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{project.contributors}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects 