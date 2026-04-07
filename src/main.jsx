import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

// Debug: Catch and display errors
window.addEventListener('error', (event) => {
  const errorDiv = document.createElement('div')
  errorDiv.style.cssText = 'position:fixed;top:0;left:0;right:0;background:red;color:white;padding:10px;z-index:9999;white-space:pre-wrap;font-size:12px;'
  errorDiv.innerHTML = `ERROR: ${event.message}<br>File: ${event.filename}<br>Line: ${event.lineno}`
  document.body.prepend(errorDiv)
})

const rootElement = document.getElementById('root')
if (!rootElement) {
  document.body.innerHTML = '<div style="color:red;padding:20px">ERROR: #root element not found!</div>'
} else {
  try {
    createRoot(rootElement).render(<App />)
  } catch (err) {
    document.body.innerHTML = `<div style="color:red;padding:20px">React Error: ${err.message}</div>`
  }
}
