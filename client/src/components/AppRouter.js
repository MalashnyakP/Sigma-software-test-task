import { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { authRoutes, publicRoutes } from '../route'
import { ART_GALLERY_ROUTE } from '../configs/routes.enum'
import { Context } from '..'

const AppRouter = observer(() => {
  const { user } = useContext(Context)

  return (
    <Switch>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      <Redirect to={ART_GALLERY_ROUTE} />
    </Switch>
  )
})

export default AppRouter
