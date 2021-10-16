import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { fetchCurrentUser } from '../http/userAPI'
import { Context } from '..'
import { UPDATE_USER } from '../configs/routes.enum'

const User = observer(() => {
  const { user } = useContext(Context)
  useEffect(() => {
    fetchCurrentUser().then((data) => user.setUser(data))
  }, [])

  const history = useHistory()

  let data = {}
  Object.assign(data, user.user.data)

  return (
    <div>
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
      <button type="submit" onClick={() => history.push(UPDATE_USER)}>
        Update
      </button>
    </div>
  )
})

export default User
