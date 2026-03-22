function Content() {
  return (
    <div className="content">
      <div className="badge">SOFTWARE ENGINEER</div>

      <p className="tagline">
        8+ Years Crafting Engaging Websites and Applications
      </p>

      <h1 className="hero-name">
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
          <div className="available-bar">Currently working at Cubiko</div>
        </div>
        <a className="email-btn" href="mailto:hello@kelliepetersen.com">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M2 7l10 7 10-7" />
          </svg>
          <span>Email Me</span>
        </a>
      </div>
    </div>
  )
}

export default Content
