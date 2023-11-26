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
  tracks: ITrack[]
  listening: number
  Album: IAlbum[]
}

export interface IAlbum {
  id: string
  Artist: IArtist
  artistId: string
  title: string
  cover: string
  tracks: ITrack[]
  listening: number
}

export interface ITrack {
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
  signIn: async (body: SignInDto) => axiosInstance.post('/auth/sign-in', body),
  signUp: async (body: SignUpDto) => axiosInstance.post('/auth/sign-up', body),
  verifyToken: async () => {
    const response = await axiosInstance.post<IUser>(
      '/auth/sign-in/verify-token'
    )
    return response.data
  },
  getAllTracks: async (userId: string | undefined) => {
    const response = await axiosInstance.get<ITrack[]>('/track/all', {
      params: { userId }
    })
    return response.data
  },
  getTrack: async (trackId: string) => {
    const response = await axiosInstance.get<ITrack>('/track', {
      params: { trackId }
    })
    return response.data
  },
  getArtist: async (artistId: string) => {
    const response = await axiosInstance.get<IArtist>('/artist', {
      params: { artistId }
    })
    return response.data
  },
  addTrackToFavorites: async (body: IAddTrack) => {
    const response = await axiosInstance.post('/track/favorite/add', body)
    return response.data
  },
  removeTrackFromFavorites: async (id: string) => {
    const response = await axiosInstance.post('/track/favorite/remove', {
      id
    })
    return response.data
  },
  listenedTrack: async (id: string) => {
    const response = await axiosInstance.post('/track/listening', {
      id
    })
    return response.data
  },
  search: async (value: string) => {
    const response = await axiosInstance.get(`/search?value=${value}`)
    return response.data
  }
}
