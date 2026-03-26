import MoonIcon from './icons/MoonIcon'
import SunIcon from './icons/SunIcon'

function Header({ theme, toggleTheme }) {
  return (
    <header className="header">
      <a className="header-logo" href="/">
        K.
      </a>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        aria-pressed={theme === 'dark'}
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  )
}

export default Header
