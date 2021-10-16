import { observe } from 'mobx'
import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { updateUser } from '../http/userAPI'
import { Context } from '..'
import { USER_ROUTE } from '../configs/routes.enum'

const UpdateUser = () => {
  const history = useHistory()
  const { user } = useContext(Context)

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')

  const updateUserClick = async () => {
    const data = await updateUser(user.id, name, avatar)
    user.setUser(data)

    history.push(USER_ROUTE)
  }

  return (
    <div>
      <label>Name</label>
      <input
        type="text"
        placeholder="Enter new name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      ></input>
      <input
        type="file"
        placeholder="Select img for avatar"
        name="avatar"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        required
      ></input>
      <button type="submit" onClick={updateUserClick}>
        Update
      </button>
    </div>
  )
}

export default UpdateUser
