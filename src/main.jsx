import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css"
import App from './App.jsx'
import $ from 'jquery'
import { AuthProvider } from './Context/authContext.jsx'
import { PaginationProvider } from './Context/paginationContext.jsx'
import { ImagesProductsProvider } from './Context/imagesProducts.jsx'
import { MsgProvider } from './Context/messageContext.jsx'


window.$ = $;
window.console || {};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
        <MsgProvider>
          <ImagesProductsProvider>
            <PaginationProvider>
              <App />
            </PaginationProvider>
          </ImagesProductsProvider>
        </MsgProvider>
      </AuthProvider>
  </React.StrictMode>,
)
