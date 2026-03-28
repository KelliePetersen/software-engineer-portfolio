import { useEffect, useState, useRef } from 'react'
import CrossIcon from './icons/CrossIcon'
import EmailIcon from './icons/EmailIcon'
import LinkedInIcon from './icons/LinkedInIcon'
import GitHubIcon from './icons/GitHubIcon'
import GitLabIcon from './icons/GitLabIcon'
import MessageSquareIcon from './icons/MessageSquareIcon'

function ContactButton({ onClick }) {
  return (
    <button className="contact-btn" onClick={onClick}>
      <MessageSquareIcon />
      <span>Contact Me</span>
    </button>
  )
}

function ContactDialog({ dialogRef, onClose }) {
  function handleBackdropClick(e) {
    if (e.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="contact-dialog"
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <button
        className="contact-dialog-close"
        onClick={onClose}
        aria-label="Close"
      >
        <CrossIcon />
      </button>
      <h2 className="contact-dialog-title">Get in touch</h2>
      <div className="contact-dialog-wrapper">
        <div className="contact-dialog-content">
          <p className="contact-dialog-desc">
            Message me here directly, or contact me through one of the links
            below, and I&apos;ll get back to you soon. Thank you!
          </p>
          <a
            className="contact-dialog-link"
            href="mailto:hello@kelliepetersen.com"
            target="_blank"
            rel="noreferrer"
          >
            <EmailIcon />
            <span>hello@kelliepetersen.com</span>
          </a>
          <a
            className="contact-dialog-link"
            href="https://www.linkedin.com/in/kelliepetersen/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon />
            <span>linkedin.com/in/kelliepetersen</span>
          </a>
          <a
            className="contact-dialog-link"
            href="https://www.github.com/kelliepetersen/"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
            <span>github.com/kelliepetersen</span>
          </a>
          <a
            className="contact-dialog-link"
            href="https://www.gitlab.com/kelliepetersen/"
            target="_blank"
            rel="noreferrer"
          >
            <GitLabIcon />
            <span>gitlab.com/kelliepetersen</span>
          </a>
        </div>
        <div className="contact-form-placeholder"></div>
      </div>
    </dialog>
  )
}

function Contact() {
  const [contactOpen, setContactOpen] = useState(false)
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (contactOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [contactOpen])

  return (
    <>
      <ContactDialog
        dialogRef={dialogRef}
        onClose={() => setContactOpen(false)}
      />
      <ContactButton onClick={() => setContactOpen(true)} />
    </>
  )
}

export default Contact
