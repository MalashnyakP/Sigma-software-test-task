import React, { useContext, useState } from 'react'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { Context } from '..'
import {
  ART_GALLERY_ROUTE,
  LOG_IN_ROUTE,
  REGISTRATION_ROUTE,
} from '../configs/routes.enum'
import { login, registration } from '../api/userAPI'
import { observer } from 'mobx-react-lite'

import '../styles/Auth.css'

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

        user.setUser(data)
        user.setIsAuth(true)
        user.setRole(data.data.user.role)
        user.setId(data.data.user._id)

        history.push(ART_GALLERY_ROUTE)
      } else {
        data = await registration(email, password)

        user.setUser(user)
        user.setIsAuth(false)

        history.push(LOG_IN_ROUTE)
      }
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <div className="authContainer">
      <h2 className="authText">{renderLogInPage ? 'Log in' : 'Register'}</h2>

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
      <button type="submit" onClick={click} className="authBtn">
        {renderLogInPage ? 'Log In' : 'Register'}
      </button>
    </div>
  )
})

export default Auth
