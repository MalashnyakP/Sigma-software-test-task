import React, { useContext } from 'react'
import { Context } from '..'
import {
  ART_GALLERY_ROUTE,
  CREATE_GALLERY,
  LOG_IN_ROUTE,
  REGISTRATION_ROUTE,
  USER_ROUTE,
  ADD_ART_PIECE,
  BASKET,
} from '../configs/routes.enum'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'
import { logout } from '../api/userAPI'

import '../styles/NavBar.css'

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
    <nav className="navContainer">
      {user.isAuth ? (
        <React.Fragment>
          <a>
            <button
              className="navButton"
              type="button"
              onClick={() => history.push(ART_GALLERY_ROUTE)}
            >
              Home
            </button>
          </a>
          {checkRole() ? (
            <React.Fragment>
              <a>
                <button
                  className="navButton"
                  type="button"
                  onClick={() => history.push(CREATE_GALLERY)}
                >
                  CreateGall
                </button>
              </a>
              <a>
                <button
                  className="navButton"
                  type="button"
                  onClick={() => history.push(ADD_ART_PIECE)}
                >
                  AddArt
                </button>
              </a>
            </React.Fragment>
          ) : (
            <React.Fragment></React.Fragment>
          )}
          <span className="filler"></span>
          <button
            className="navButton"
            type="button"
            onClick={() => history.push(BASKET)}
          >
            Basket
          </button>
          <a>
            <button
              className="navButton"
              type="button"
              onClick={() => history.push(USER_ROUTE)}
            >
              Cabinet
            </button>
          </a>
          <a>
            <button
              className="navButton"
              type="button"
              onClick={() => logOut()}
            >
              LogOut
            </button>
          </a>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <a>
            <button
              className="navButton"
              type="button"
              onClick={() => history.push(ART_GALLERY_ROUTE)}
            >
              Home
            </button>
          </a>
          <span className="filler"></span>
          <a>
            <button
              className="navButton"
              type="button"
              onClick={() => history.push(REGISTRATION_ROUTE)}
            >
              Register
            </button>
          </a>
          <a>
            <button
              className="navButton"
              type="button"
              onClick={() => history.push(LOG_IN_ROUTE)}
            >
              LogIn
            </button>
          </a>
        </React.Fragment>
      )}
    </nav>
  )
})

export default NavBar
