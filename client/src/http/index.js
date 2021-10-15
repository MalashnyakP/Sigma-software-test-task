import axios from 'axios'

const $host = axios.create({
  baseURL: 'http://localhost:5000/',
})

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem(
    'access_token',
  )}`
  return config
}

$authHost.interceptors.request.use(authInterceptor)

export { $host, $authHost }
