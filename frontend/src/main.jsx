// React
import React from 'react'
import ReactDOM from 'react-dom/client'

// App component
import App from './App.jsx'

// Libraries styles
import './index.css'

// Toastify styles
import "toastify-js/src/toastify.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
