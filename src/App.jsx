import './App.css'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <div className="wrapper">
        <Header />
        <Content />
        <Footer />
      </div>
    </div>
  )
}

export default App
