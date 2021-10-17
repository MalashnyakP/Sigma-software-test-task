import { useContext, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { observer } from 'mobx-react-lite'
import { fetchCurrentUser } from './api/userAPI'
import { Context } from '.'

import './styles/App.css'

const App = observer(() => {
  const { user } = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('refresh_token')) {
      fetchCurrentUser().then((data) => {
        if (data) {
          user.setUser(data)
          user.setIsAuth(true)
        }
      })
    }
  }, [])

  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <AppRouter />
      </main>
    </BrowserRouter>
  )
})

export default App
