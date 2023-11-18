import { axiosInstance } from '.'
import { IUser } from '../store'

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

export interface IArtist {
  id: string
  artistPhoto: string | null
  name: string
  tracks: Track[]
  listening: number
  Album: IAlbum[]
}

export interface IAlbum {
  id: string
  Artist: IArtist
  artistId: string
  title: string
  cover: string
  tracks: Track[]
  listening: number
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
  verifyToken: async () => {
    try {
      const response = await axiosInstance.post<IUser>(
        '/auth/sign-in/verify-token'
      )
      return response.data
    } catch (error) {
      try {
        localStorage.removeItem('accessToken')
      } catch (error) {
        console.log(error, 'Error remove access token on local storage')
      }
      console.log(error, 'Error sign-in with access token')
    }
  },
  getAllTracks: async (userId: string | undefined) => {
    try {
      const response = await axiosInstance.get<Track[]>('/track/all', {
        params: { userId }
      })
      return response.data
    } catch (error) {
      console.log(error, 'Error get all tracks')
    }
  },
  getTrack: async (trackId: string) => {
    try {
      const response = await axiosInstance.get<Track>('/track', {
        params: { trackId }
      })
      return response.data
    } catch (error) {
      console.log(error, 'Error get all tracks')
    }
  },
  getArtist: async (artistId: string) => {
    try {
      const response = await axiosInstance.get<IArtist>('/artist', {
        params: { artistId }
      })
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
