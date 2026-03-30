import MoonIcon from './icons/MoonIcon'
import SunIcon from './icons/SunIcon'

function Header({ theme, toggleTheme }) {
  return (
    <header className="header">
      <a className="header-logo" href="/">
        K.
      </a>
      <div className="header-actions">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-pressed={theme === 'dark'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  )
}

export default Header
