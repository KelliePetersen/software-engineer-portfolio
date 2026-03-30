import { useRef, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import MatterBackground from './components/MatterBackground'
import useTheme from './hooks/useTheme'

function App() {
  const { theme, toggleTheme } = useTheme()
  const matterRef = useRef(null)
  const [sillyMode, setSillyMode] = useState(false)
  const sillyIntervalRef = useRef(null)

  function handleSpawnCircle() {
    matterRef.current?.spawnCircle()
  }

  function handleSpawnParenthesis() {
    matterRef.current?.spawnParenthesis()
  }

  function handleToggleSillyMode() {
    if (sillyMode) {
      clearInterval(sillyIntervalRef.current)
      matterRef.current?.clearBodies()
      setSillyMode(false)
    } else {
      setSillyMode(true)
      let i = 0
      sillyIntervalRef.current = setInterval(() => {
        if (Math.random() < 0.5) {
          matterRef.current?.spawnCircle()
        } else {
          matterRef.current?.spawnParenthesis()
        }
        if (++i >= 200) clearInterval(sillyIntervalRef.current)
      }, 60)
    }
  }

  return (
    <div className="app">
      <MatterBackground ref={matterRef} />
      <div className="wrapper">
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          sillyMode={sillyMode}
          onToggleSillyMode={handleToggleSillyMode}
        />
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
