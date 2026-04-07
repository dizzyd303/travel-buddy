import { useState } from 'react'

export default function SignUpForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Netlify will handle the actual submission via the form's hidden input
    setSubmitted(true)
    // Clear the email field after a moment
    setTimeout(() => setSubmitted(false), 3000)
    setEmail('')
  }

  return (
    <section className="signup-section">
      <div className="container">
        <h2>Get Early Access</h2>
        <p>Be the first to know when new parking spots are added.</p>
        <form
          name="trucker-signup"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="trucker-signup" />
          <p className="hidden">
            <label>
              Don’t fill this out: <input name="bot-field" />
            </label>
          </p>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Notify Me</button>
          </div>
        </form>
        {submitted && <p className="success-msg">Thanks! We'll be in touch.</p>}
      </div>
    </section>
  )
}
