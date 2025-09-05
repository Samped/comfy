// React import not needed with new JSX transform
import { Calendar, MapPin, Clock, Users, ExternalLink } from 'lucide-react'

const Events = () => {
  const events = [
    {
      name: 'Comfy Verse Hackathon 2024',
      date: 'Dec 15-17, 2024',
      time: '9:00 AM - 6:00 PM',
      location: 'San Francisco, CA',
      attendees: 150,
      description: 'Join us for our biggest hackathon yet! Build innovative solutions with fellow community members.',
      status: 'Upcoming'
    },
    {
      name: 'Web3 Workshop Series',
      date: 'Every Tuesday',
      time: '7:00 PM - 9:00 PM',
      location: 'Virtual',
      attendees: 45,
      description: 'Learn about blockchain, smart contracts, and decentralized applications.',
      status: 'Ongoing'
    },
    {
      name: 'AI & ML Meetup',
      date: 'Jan 20, 2025',
      time: '6:30 PM - 8:30 PM',
      location: 'New York, NY',
      attendees: 80,
      description: 'Explore the latest developments in artificial intelligence and machine learning.',
      status: 'Upcoming'
    }
  ]

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Community <span className="gradient-text">Events</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connect with fellow community members at our exciting events. From hackathons to workshops, 
            there's always something happening in the Comfy Verse community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <div key={index} className="glass p-8 rounded-2xl card-hover">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white">{event.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  event.status === 'Upcoming' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                }`}>
                  {event.status}
                </span>
              </div>
              
              <p className="text-gray-300 mb-6">{event.description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-400">
                  <Calendar className="w-4 h-4 mr-3" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Clock className="w-4 h-4 mr-3" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin className="w-4 h-4 mr-3" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Users className="w-4 h-4 mr-3" />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <button className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300">
                  Register
                </button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Events 