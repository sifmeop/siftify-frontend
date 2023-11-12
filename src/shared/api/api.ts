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
  cover: string
  track: string
  featuring: IFeaturing[]
  artistId: string
  listening: number
  userId: string | null
  artist: {
    name: string
    artistPhoto: string
  }
  duration: string
  added_at: string
  favoriteBy: TrackFavoriteType
}

export interface IFeaturing {
  id: string
  name: string
}

export interface IFavorite {
  added_at: string
  id: string
  trackId: string
  userId: string
}

export type TrackFavoriteType = IFavorite | null

export interface IAddTrack {
  // userId: string
  trackId: string
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
  getAllTracks: async (userId: string) => {
    try {
      const response = await axiosInstance.get<Track[]>(`/track/all/${userId}`)
      return response.data
    } catch (error) {
      console.log(error, 'Error get all tracks')
    }
  },
  getArtist: async (id: string | undefined) => {
    try {
      const response = await axiosInstance.get(`/artist/${id}`)
      return response.data
    } catch (error) {
      console.log(error, 'Error get tracks artist')
    }
  },
  addTrackToFavorites: async (body: IAddTrack) => {
    try {
      const response = await axiosInstance.post('/track/favorite/add', body)
      return response.data
    } catch (error) {
      console.log(error, 'Error add track to favorite')
    }
  },
  removeTrackFromFavorites: async (id: string) => {
    try {
      const response = await axiosInstance.post('/track/favorite/remove', {
        id
      })
      return response.data
    } catch (error) {
      console.log(error, 'Error remove track from favorite')
    }
  }
  // listenedTrack: async (id:string) => {
  //   try {
  //     const response = await axiosInstance.post('/track/favorite/remove', {
  //       id
  //     })
  //     return response.data
  //   } catch (error) {
  //     console.log(error, 'Error remove track from favorite')
  //   }
  // }
}
