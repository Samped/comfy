import { MapPin } from 'lucide-react'

const Community = () => {
  const members = [
    { name: 'Alex Chen', role: 'Full Stack Developer', location: 'San Francisco', avatar: '👨‍💻', skills: ['React', 'Node.js', 'Python'] },
    { name: 'Sarah Kim', role: 'UI/UX Designer', location: 'New York', avatar: '👩‍🎨', skills: ['Figma', 'Sketch', 'CSS'] },
    { name: 'Marcus Rodriguez', role: 'DevOps Engineer', location: 'Austin', avatar: '👨‍💼', skills: ['Docker', 'Kubernetes', 'AWS'] },
    { name: 'Emma Wilson', role: 'Data Scientist', location: 'Seattle', avatar: '👩‍🔬', skills: ['Python', 'TensorFlow', 'SQL'] },
    { name: 'David Park', role: 'Mobile Developer', location: 'Los Angeles', avatar: '👨‍💻', skills: ['React Native', 'iOS', 'Android'] },
    { name: 'Lisa Thompson', role: 'Product Manager', location: 'Chicago', avatar: '👩‍💼', skills: ['Agile', 'User Research', 'Strategy'] },
  ]

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Our <span className="gradient-text">Community</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the brilliant minds that make Comfy Verse special. From developers to designers, 
            innovators to entrepreneurs - we're building the future together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <div key={index} className="glass p-6 rounded-2xl card-hover">
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{member.avatar}</div>
                <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-primary-400 mb-2">{member.role}</p>
                <div className="flex items-center justify-center text-gray-400 text-sm mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  {member.location}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {member.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-primary-500/20 text-primary-300 text-sm rounded-full border border-primary-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="glass p-8 rounded-2xl inline-block">
            <h2 className="text-2xl font-bold text-white mb-4">Join Our Community</h2>
            <p className="text-gray-300 mb-6">
              Ready to connect with amazing people and build something incredible?
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community 