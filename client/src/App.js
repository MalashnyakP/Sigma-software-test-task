import { useContext, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { observer } from 'mobx-react-lite'
import { fetchCurrentUser } from './http/userAPI'
import { Context } from '.'

import './App.css'

const App = observer(() => {
  const { user } = useContext(Context)

  // useEffect(() => {
  //   fetchCurrentUser().then((data) => {
  //     if (data) {
  //       user.setUser(data)
  //       user.setIsAuth(true)
  //     }
  //   })
  // }, [])

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
