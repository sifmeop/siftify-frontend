import axios from 'axios'
import { getItemFromLocalStorage } from '../lib/localStorage'

export const BASE_URL = 'http://localhost:5000'

export const axiosInstance = axios.create({
  baseURL: BASE_URL
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getItemFromLocalStorage('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)
