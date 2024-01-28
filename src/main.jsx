import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css"
import App from './App.jsx'
import $ from 'jquery'
import { AuthProvider } from './Context/authContext.jsx'
import { PaginationProvider } from './Context/paginationContext.jsx'
import { ImagesProductsProvider } from './Context/imagesProducts.jsx'
import { MsgProvider } from './Context/messageContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

window.$ = $;
window.console || {};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='909316839836-f6ig5si1ab9qo7u8jtddt4or98rlhoju.apps.googleusercontent.com'>
      <AuthProvider>
        <MsgProvider>
          <ImagesProductsProvider>
            <PaginationProvider>
              <App />
            </PaginationProvider>
          </ImagesProductsProvider>
        </MsgProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
