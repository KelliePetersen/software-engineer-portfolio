import { useRef } from 'react'
import CrossIcon from './icons/CrossIcon'
import EmailIcon from './icons/EmailIcon'
import LinkedInIcon from './icons/LinkedInIcon'
import GitHubIcon from './icons/GitHubIcon'
import GitLabIcon from './icons/GitLabIcon'
import MessageSquareIcon from './icons/MessageSquareIcon'
import ContactForm from './ContactForm'

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
      <div className="contact-dialog-wrapper">
        <button
          className="contact-dialog-close"
          onClick={onClose}
          aria-label="Close"
        >
          <CrossIcon />
        </button>
        <h2 className="contact-dialog-title">Get in touch</h2>
        <div className="contact-dialog-content">
          <div className="contact-dialog-text">
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
          <ContactForm closeModal={onClose} />
        </div>
      </div>
    </dialog>
  )
}

function Contact() {
  const dialogRef = useRef(null)

  function openModal() {
    dialogRef.current?.showModal()
  }

  function closeModal() {
    const dialog = dialogRef.current
    if (!dialog) return
    if (dialog.open) {
      // Some browsers (e.g. Safari, Firefox) don't animate closing dialog, so classes must be added
      dialog.classList.add('closing')
      dialog.addEventListener(
        'transitionend',
        () => {
          dialog.classList.remove('closing')
          dialog.close()
        },
        { once: true }
      )
    }
  }

  return (
    <>
      <ContactDialog dialogRef={dialogRef} onClose={closeModal} />
      <ContactButton onClick={openModal} />
    </>
  )
}

export default Contact
