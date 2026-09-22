import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import './index.css'
import { Analytics } from "@vercel/analytics/react"

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    {/* reducedMotion="user" makes every framer-motion animation respect the OS
        "reduce motion" setting automatically. */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
    <Analytics />
  </>
)
