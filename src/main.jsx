import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

/* Avoid animating during page load, particularly jarring on dark-mode */
window.addEventListener('load', () => {
  document.documentElement.classList.add('ready')
})
