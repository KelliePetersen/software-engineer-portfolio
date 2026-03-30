import Contact from './Contact'

function Hero() {
  const experience = new Date().getFullYear() - 2018

  return (
    <div className="hero">
      <div className="hero-wrapper">
        <div className="hero-badge">SOFTWARE ENGINEER</div>
        <p className="hero-tagline">
          {experience}+ Years Crafting Engaging Websites and Applications
        </p>
        <h1 className="hero-title">
          Kellie <br /> Petersen
        </h1>
        <div className="hero-subheading-wrapper">
          <p className="hero-desc">
            Specialising in React, TypeScript and Clojure.
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
