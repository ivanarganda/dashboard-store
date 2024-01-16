import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css"
import App from './App.jsx'
import $ from 'jquery'

window.$ = $;
window.console || {};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
