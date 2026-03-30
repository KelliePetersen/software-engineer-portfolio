import { useRef } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import MatterBackground from './components/MatterBackground'
import useTheme from './hooks/useTheme'
import useCursor from './hooks/useCursor'

function App() {
  const { theme, toggleTheme } = useTheme()
  useCursor()
  const matterRef = useRef(null)

  function handleSpawnCircle() {
    matterRef.current?.spawnCircle()
  }

  function handleSpawnParenthesis() {
    matterRef.current?.spawnParenthesis()
  }

  return (
    <div className="app">
      <MatterBackground ref={matterRef} />
      <div className="wrapper">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Hero
          onSpawnCircle={handleSpawnCircle}
          onSpawnParenthesis={handleSpawnParenthesis}
        />
        <Footer />
      </div>
    </div>
  )
}

export default App
