import axios from 'axios'

export const BASE_URL = 'http://localhost:5000'

export const axiosInstance = axios.create({
  baseURL: BASE_URL
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)
