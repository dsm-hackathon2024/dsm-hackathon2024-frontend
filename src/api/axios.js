import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 30000,
  withCredentials: true
})

instance.interceptors.request.use(
  async function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(undefined, function (error) {
  throw error
})
