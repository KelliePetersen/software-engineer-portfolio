import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import useTheme from './hooks/useTheme'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="app">
      <div className="wrapper">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Hero />
        <Footer />
      </div>
    </div>
  )
}

export default App
