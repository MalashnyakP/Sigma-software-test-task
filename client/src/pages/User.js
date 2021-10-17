import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'

import { fetchCurrentUser } from '../api/userAPI'
import { Context } from '..'

import '../styles/Cabinet.css'

const User = observer(() => {
  const { user } = useContext(Context)
  useEffect(() => {
    fetchCurrentUser().then((data) => user.setUser(data))
  }, [])

  let data = {}
  Object.assign(data, user.user.data)

  return (
    <div className="cabinetContainer">
      {data.email ? (
        <div>
          <p>Email:</p>
          <p>{data.email}</p>
        </div>
      ) : (
        <h3></h3>
      )}
      {data.name ? (
        <div>
          <p>Name:</p>
          <p>{data.name}</p>
        </div>
      ) : (
        <h3></h3>
      )}
      {data.role ? (
        <div>
          <p>Role:</p>
          <p>{data.role}</p>
        </div>
      ) : (
        <h3></h3>
      )}
      {data.avatar ? (
        <img widht="140px" height="150px" src={data.avatar} />
      ) : (
        <h3></h3>
      )}
    </div>
  )
})

export default User
