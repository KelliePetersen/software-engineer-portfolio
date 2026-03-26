import EmailIcon from './icons/EmailIcon'

function Hero() {
  return (
    <div className="hero">
      <div className="hero-badge">SOFTWARE ENGINEER</div>

      <p className="hero-tagline">
        8+ Years Crafting Engaging Websites and Applications
      </p>

      <h1 className="hero-title">
        Kellie <br /> Petersen
      </h1>

      <div className="hero-bottom-wrapper">
        <div className="hero-subheading-wrapper">
          <p className="hero-desc">
            Specialising in React, TypeScript and Clojure.
            <br />
            Interested in working with talented teams and building high-impact
            products that make a difference.
          </p>
          <div className="hero-employment">Currently working at Cubiko</div>
        </div>
        <a className="hero-email-btn" href="mailto:hello@kelliepetersen.com">
          <EmailIcon />
          <span>Email Me</span>
        </a>
      </div>
    </div>
  )
}

export default Hero
