import { useContext, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import { observer } from 'mobx-react-lite'
import { fetchCurrentUser } from './http/userAPI'
import { Context } from '.'

const App = observer(() => {
  const { user } = useContext(Context)

  useEffect(() => {
    fetchCurrentUser().then((data) => {
      user.setUser(data)
      user.setIsAuth(true)
    })
  }, [])

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
})

export default App
