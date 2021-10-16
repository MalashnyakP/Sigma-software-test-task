require('dotenv').config()
import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import GalleryStore from './store/GalleryStore'
import UserStore from './store/UserStore'

export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      gallery: new GalleryStore(),
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById('root'),
)
