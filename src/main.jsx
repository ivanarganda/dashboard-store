import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css"
import App from './App.jsx'
import $ from 'jquery'

import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer_auth from "./Global/reducersAuth";

window.$ = $;
window.console || {};

const store = createStore(reducer_auth);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
