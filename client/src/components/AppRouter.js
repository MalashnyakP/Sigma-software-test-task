import { Switch, Route, Redirect } from 'react-router-dom'

import { routes } from '../route'
import { LOG_IN_ROUTE } from '../configs/routes.enum'

const AppRouter = () => {
  return (
    <Switch>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      <Redirect to={LOG_IN_ROUTE} />
    </Switch>
  )
}

export default AppRouter
