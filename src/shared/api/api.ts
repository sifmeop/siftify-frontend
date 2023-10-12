import { toast } from 'react-toastify'
import { axiosInstance } from '.'

export interface SignUpDto {
  email: string
  username: string
  password: string
  confirmPassword: string
}

export const siftifyApi = {
  signUp: async (body: SignUpDto) => {
    try {
      const response = await axiosInstance.post('/auth/sign-up', body)
      return response.data
    } catch (error) {
      console.log(error, 'Error sign-up')
      toast.error('Ошибка регистрации')
    }
  }
}
