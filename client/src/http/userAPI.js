import { $authHost, $host } from './index'

export const registration = async (email, password) => {
  const { data } = await $host.post('auth/signup', { email, password })
  return { data }
}

export const login = async (email, password) => {
  const { data } = await $host.post('auth', { email, password })
  localStorage.setItem('access_token', data.access_token)
  localStorage.setItem('refresh_token', data.refresh_token)
  return { data }
}

export const logout = async () => {
  try {
    const { data } = await $host.post(
      `auth/logout`,
      {},
      {
        headers: { Authorization: localStorage.getItem('access_token') },
      },
    )
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    return { data }
  } catch (e) {
    alert(e.response.data.message)
  }
}

export const fetchCurrentUser = async () => {
  try {
    const { data } = await $host.get(`user`, {
      headers: { Authorization: localStorage.getItem('access_token') },
    })

    return { data }
  } catch (e) {
    console.log(e.response.data.message)
  }
}

export const fetchUserGalleries = async () => {
  try {
    const { data } = await $host.get('gallery/user', {
      headers: { Authorization: localStorage.getItem('access_token') },
    })

    return data
  } catch (e) {
    console.log(e.response.data.message)
  }
}

export const updateUser = async (user_id, name, avatar) => {
  try {
    const { data } = await $host.put(
      `user/${user_id}`,
      { name, avatar },
      { params: { user_id } },
    )
    return data
  } catch (e) {
    console.log(e.response.data.message)
  }
}
