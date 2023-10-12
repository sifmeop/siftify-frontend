import axios, { AxiosResponse } from 'axios'

const baseURL = 'http://localhost:5000/api'

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken !== null && accessToken.length > 0) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  async (error) => {
    return await Promise.reject(error)
  }
)

interface ResponseWithTokens {
  accessToken?: string
  refreshToken?: string
}

axiosInstance.interceptors.response.use(
  (config: AxiosResponse<ResponseWithTokens>) => {
    if (config.data.accessToken) {
      localStorage.setItem('accessToken', config.data.accessToken)
    }
    if (config.data.refreshToken) {
      localStorage.setItem('refreshToken', config.data.refreshToken)
    }
    return config
  },
  (error) => {
    throw error
  }
)
