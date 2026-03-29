import { useState } from 'react'

const INITIAL_STATE = { name: '', email: '', message: '' }

function ContactForm({ closeModal }) {
  const [fields, setFields] = useState(INITIAL_STATE)
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'

  function handleChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const body = new URLSearchParams({ 'form-name': 'contact', ...fields })
      const res = await fetch('/', { method: 'POST', body })
      if (!res.ok) throw new Error(res.status)
      setStatus('sent')
      setFields(INITIAL_STATE)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="contact-form-success">
        <p>Thanks, your message has been sent! I&apos;ll be in touch soon.</p>
        <div className="contact-form-success-btns">
          <button
            className="contact-form-btn contact-form-btn-secondary"
            onClick={() => setStatus(null)}
          >
            Send more
          </button>
          <button className="contact-form-btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} name="contact" data-netlify="true">
      <input type="hidden" name="form-name" value="contact" />
      <div className="contact-form-field">
        <label className="screen-reader-only" htmlFor="contact-name">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          placeholder="Your Name"
          value={fields.name}
          onChange={handleChange}
          autoComplete="name"
          required
        />
      </div>

      <div className="contact-form-field">
        <label className="screen-reader-only" htmlFor="contact-email">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          placeholder="Your Email"
          value={fields.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
      </div>

      <div className="contact-form-field">
        <label className="screen-reader-only" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Your Message"
          value={fields.message}
          onChange={handleChange}
          rows={5}
          required
        />
      </div>

      {status === 'error' && (
        <p className="contact-form-error">
          This is embarrassing, but something went wrong! Please try again, or
          contact me through one of the links instead.
        </p>
      )}

      <button
        className="contact-form-btn"
        type="submit"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}

export default ContactForm
