import { useRef } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import MatterBackground from './components/MatterBackground'
import useTheme from './hooks/useTheme'

function App() {
  const { theme, toggleTheme } = useTheme()
  const matterRef = useRef(null)

  function handleSpawnCircle() {
    matterRef.current?.spawnCircle()
  }

  return (
    <div className="app">
      <MatterBackground ref={matterRef} />
      <div className="wrapper">
        <Header theme={theme} toggleTheme={toggleTheme} onSpawnCircle={handleSpawnCircle} />
        <Hero />
        <Footer />
      </div>
    </div>
  )
}

export default App
