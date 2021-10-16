import React, { useContext } from 'react'
import { Context } from '..'
import {
  ART_GALLERY_ROUTE,
  CREATE_GALLERY,
  LOG_IN_ROUTE,
  REGISTRATION_ROUTE,
  USER_ROUTE,
  ADD_ART_PIECE,
} from '../configs/routes.enum'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'
import { logout } from '../http/userAPI'

const NavBar = observer(() => {
  const { user } = useContext(Context)
  const history = useHistory()

  const logOut = async () => {
    await logout()
    user.setUser(false)
    user.setIsAuth(false)
    user.setRole('')

    history.push(ART_GALLERY_ROUTE)
  }

  const checkRole = () => {
    if (user.role) {
      return user.role === 'owner'
    }
    return false
  }

  return (
    <div>
      {user.isAuth ? (
        <ul>
          <li>
            <button
              type="button"
              onClick={() => history.push(ART_GALLERY_ROUTE)}
            >
              Home
            </button>
          </li>
          {checkRole() ? (
            <div>
              <li>
                <button
                  type="button"
                  onClick={() => history.push(CREATE_GALLERY)}
                >
                  CreateGall
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => history.push(ADD_ART_PIECE)}
                >
                  AddArt
                </button>
              </li>
            </div>
          ) : (
            <li></li>
          )}
          <li>
            <button type="button" onClick={() => history.push(USER_ROUTE)}>
              Cabinet
            </button>
          </li>
          <li>
            <button type="button" onClick={() => logOut()}>
              LogOut
            </button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <button
              type="button"
              onClick={() => history.push(ART_GALLERY_ROUTE)}
            >
              Home
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => history.push(REGISTRATION_ROUTE)}
            >
              Register
            </button>
          </li>
          <li>
            <button type="button" onClick={() => history.push(LOG_IN_ROUTE)}>
              LogIn
            </button>
          </li>
        </ul>
      )}
    </div>
  )
})

export default NavBar
