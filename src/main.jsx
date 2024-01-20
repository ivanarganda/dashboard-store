import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css"
import App from './App.jsx'
import $ from 'jquery'
import { AuthProvider } from './Context/authContext.jsx'
import { PaginationProvider } from './Context/paginationContext.jsx'

window.$ = $;
window.console || {};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
        <PaginationProvider>
          <App />
        </PaginationProvider>
      </AuthProvider>
  </React.StrictMode>,
)
