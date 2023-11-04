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

export interface Track {
  id: string
  title: string
  poster: string
  track: string
  featuring: string[]
  artistId: string
  listening: number
  userId: string | null
  artist: {
    name: string
    photo: string
  }
  duration: string
  created_at: string
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
  },
  getAllTracks: async () => {
    try {
      const response = await axiosInstance.get<Track[]>('/track/all')
      return response.data
    } catch (error) {
      console.log(error, 'Error get all tracks')
    }
  }
}
