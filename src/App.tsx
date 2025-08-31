import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CommunityGames from './pages/CommunityGames'
import Comfy from './pages/Comfy'
import ArtDrawing from './pages/ArtDrawing'
import ArtInVideo from './pages/ArtInVideo'
import ArtMeme from './pages/ArtMeme'
import ArtCommunityCanvases from './pages/ArtCommunityCanvases'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen" style={{ backgroundColor: '#0f172a' }}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/community-games" element={<CommunityGames />} />
            <Route path="/comfy" element={<Comfy />} />
            <Route path="/art/drawing" element={<ArtDrawing />} />
            <Route path="/art/invideo" element={<ArtInVideo />} />
            <Route path="/art/meme" element={<ArtMeme />} />
            <Route path="/art/community-canvases" element={<ArtCommunityCanvases />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App 