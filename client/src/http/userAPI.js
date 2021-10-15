import { $host } from './index'

export const registration = async (email, password) => {
  const { data } = await $host.post('auth/signup', { email, password })
  return data
}

export const login = async (email, password) => {
  const { data } = await $host.post('auth', { email, password })
  localStorage.setItem('access_token', data.access_token)
  localStorage.setItem('refresh_token', data.refresh_token)
  return data
}
