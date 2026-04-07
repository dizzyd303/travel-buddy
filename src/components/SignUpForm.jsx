import { useState } from 'react'

export default function SignUpForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('https://formspree.io/f/xlgozgke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      if (response.ok) {
        setStatus('success')
        setMessage('Thanks! You\'re on the list 🚛')
        setEmail('')
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section className="signup-section">
      <div className="container">
        <h2>Get Early Access</h2>
        <p>Be the first to know when new parking spots are added.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
            />
            <button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Notify Me'}
            </button>
          </div>
        </form>
        {status === 'success' && <p className="success-msg">{message}</p>}
        {status === 'error' && <p className="error-msg">{message}</p>}
      </div>
    </section>
  )
}
