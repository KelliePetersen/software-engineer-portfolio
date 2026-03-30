import Contact from './Contact'

function Hero({ onSpawnCircle, onSpawnParenthesis }) {
  const experience = new Date().getFullYear() - 2018

  return (
    <div className="hero">
      <div className="hero-wrapper">
        <button
          className="hero-badge-btn"
          onClick={onSpawnCircle}
          aria-label="Spawn a falling circle to demonstrate my playful side to you"
        >
          SOFTWARE ENGINEER
        </button>
        <p className="hero-tagline">
          {experience}+ Years Crafting Engaging Websites and Applications
        </p>
        <h1 className="hero-title">
          Kellie <br /> Petersen
        </h1>
        <div className="hero-subheading-wrapper">
          <p className="hero-desc">
            Specialising in React, TypeScript and{' '}
            <button
              className="hero-clojure-btn"
              onClick={onSpawnParenthesis}
              aria-label="Spawn a falling parantheses"
            >
              Clojure
            </button>
            .
            <br />
            Interested in working with talented teams and building high-impact
            products that make a difference.
          </p>
          <div className="hero-employment">Currently working at Cubiko</div>
        </div>
      </div>
      <Contact />
    </div>
  )
}

export default Hero
