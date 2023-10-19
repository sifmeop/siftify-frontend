import { axiosInstance } from '.'

export interface SignInDto {
  email: string
  password: string
}

export interface SignUpDto {
  email: string
  username: string
  password: string
  confirmPassword: string
}

export interface SignError {
  message?: string
  response?: {
    data?: {
      message?: string
    }
  }
}

export const siftifyApi = {
  signIn: async (body: SignInDto) => {
    try {
      return axiosInstance.post('/auth/sign-in', body)
    } catch (error) {
      console.log(error, 'Error sign-in')
    }
  },
  signUp: async (body: SignUpDto) => {
    try {
      return axiosInstance.post('/auth/sign-up', body)
    } catch (error) {
      console.log(error, 'Error sign-up')
    }
  }
}
