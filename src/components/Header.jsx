import MoonIcon from './icons/MoonIcon'
import SunIcon from './icons/SunIcon'

function Header({ theme, toggleTheme, onSpawnCircle }) {
  return (
    <header className="header">
      <a className="header-logo" href="/">
        K.
      </a>
      <div className="header-actions">
        <button
          className="spawn-circle-btn"
          onClick={onSpawnCircle}
          aria-label="Spawn a falling circle"
          title="Spawn circle"
        >
          <svg
            width="1rem"
            height="1rem"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="7" />
          </svg>
        </button>
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
