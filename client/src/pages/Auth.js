/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { Context } from '..'
import {
  LOG_IN_ROUTE,
  REGISTRATION_ROUTE,
  USER_ROUTE,
} from '../configs/routes.enum'
import { login, registration } from '../http/userAPI'
import { observer } from 'mobx-react-lite'

const Auth = observer(() => {
  const { user } = useContext(Context)
  const location = useLocation()
  const history = useHistory()

  const renderLogInPage = location.pathname === LOG_IN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
    try {
      let data
      if (renderLogInPage) {
        data = await login(email, password)

        user.setUser(data.user)
        user.setIsAuth(true)

        history.push(USER_ROUTE)
      } else {
        data = await registration(email, password)

        user.setUser(data.user)
        user.setIsAuth(true)

        history.push(LOG_IN_ROUTE)
      }
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <div>
      <h2>{renderLogInPage ? 'Log in' : 'Register'}</h2>
      <div>
        <div>
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <div>
            {renderLogInPage ? (
              <div>
                Need an account?
                <NavLink to={REGISTRATION_ROUTE}> Sign up</NavLink>
              </div>
            ) : (
              <div>
                Already have an account?
                <NavLink to={LOG_IN_ROUTE}> Log in</NavLink>
              </div>
            )}
            <button type="submit" onClick={click}>
              {renderLogInPage ? 'Log In' : 'Register'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Auth
