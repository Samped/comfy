// React import not needed with new JSX transform
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CommunityGames from './pages/CommunityGames'
import Comfy from './pages/Comfy'
import ArtInVideo from './pages/ArtInVideo'
import ArtMeme from './pages/ArtMeme'
import ArtCommunityCanvases from './pages/ArtCommunityCanvases'
import IncoBeats from './pages/IncoBeats'
import Blog from './pages/Blog'
import BlogArticleView from './pages/BlogArticle'


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
            <Route path="/art/invideo" element={<ArtInVideo />} />
            <Route path="/art/meme" element={<ArtMeme />} />
            <Route path="/art/community-canvases" element={<ArtCommunityCanvases />} />
            <Route path="/incobeats" element={<IncoBeats />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/article/:id" element={<BlogArticleView />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App 