import axios from 'axios'

export const instance = axios.create({
  baseURL: 'http://192.168.0.121:8080',
  timeout: 30000,
  // withCredentials: true
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
