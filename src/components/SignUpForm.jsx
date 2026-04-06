import React from 'react'

export default function SignUpForm() {
  return (
    <div className="card signup" aria-label="Signup">
      <h3>Join the Pilot</h3>
      <p>Be first to test the MVP and provide feedback. We’ll notify you as features roll out.</p>
      <form
        name="travelbuddy-signup"
        method="POST"
        data-netlify="true"
        onSubmit={(e) => {
          // Netlify Forms will handle this
        }}
      >
        <input type="hidden" name="form-name" value="travelbuddy-signup" />
        <div className="form-row">
          <label>Your name</label>
          <input name="name" type="text" placeholder="Your name" required />
        </div>
        <div className="form-row">
          <label>Email</label>
          <input name="email" type="email" placeholder="Email" required />
        </div>
        <div className="form-row">
          <label>Location (City, State)</label>
          <input name="location" type="text" placeholder="City, State" required />
        </div>
        <button className="btn primary" type="submit" style={{ marginTop: 8 }}>
          Sign Up
        </button>
      </form>
    </div>
  )
}

