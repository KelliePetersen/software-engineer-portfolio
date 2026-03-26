import EmailIcon from './icons/EmailIcon'
import LinkedInIcon from './icons/LinkedInIcon'
import GitHubIcon from './icons/GitHubIcon'
import GitLabIcon from './icons/GitLabIcon'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <div className="footer-contact-links">
        <a
          className="footer-contact-link"
          href="mailto:hello@kelliepetersen.com"
          aria-label="Email address of Kellie Petersen"
        >
          <EmailIcon />
          <span>Email</span>
        </a>
        <a
          className="footer-contact-link"
          href="https://www.linkedin.com/in/kelliepetersen/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile of Kellie Petersen"
        >
          <LinkedInIcon />
          <span>LinkedIn</span>
        </a>
        <a
          className="footer-contact-link"
          href="https://www.github.com/kelliepetersen/"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile of Kellie Petersen"
        >
          <GitHubIcon />
          <span>GitHub</span>
        </a>
        <a
          className="footer-contact-link"
          href="https://www.gitlab.com/kelliepetersen/"
          target="_blank"
          rel="noreferrer"
          aria-label="GitLab profile of Kellie Petersen"
        >
          <GitLabIcon />
          <span>GitLab</span>
        </a>
      </div>
      <span className="footer-copyright">
        © {currentYear} • Kellie Petersen. All rights reserved.
      </span>
    </footer>
  )
}

export default Footer
