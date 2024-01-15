import { axiosInstance } from '.'
import { IUser } from '../store'

export interface ResponseError {
  response?: {
    data?: {
      message?: string
      statusCode?: string
    }
  }
}

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

export const enum MediaObjectType {
  TRACK = 'TRACK',
  ARTIST = 'ARTIST',
  ALBUM = 'ALBUM'
}

export interface IArtist {
  id: string
  artistPhoto: string | null
  name: string
  tracks: ITrack[]
  listening: number
  Album: IAlbum[]
  type: MediaObjectType.ARTIST
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
  addedAt: string
  favoriteBy: TrackFavoriteType
  type: MediaObjectType.TRACK
  album: IAlbum
  uploadedAt: string
}

export interface IAlbum {
  id: string
  title: string
  cover: string
  artistId: string
  artist: {
    name: string
    tracks: ITrack[]
    artistPhoto: string | null
  }
  createdAt: string
  tracks: ITrack[]
}

export interface IQueueTrack extends ITrack {
  queueTrackId: string
}

export interface IFeaturing {
  artistId: string
  name: string
}

export interface IFavorite {
  addedAt: string
  id: string
  trackId: string
  userId: string
}

export type TrackFavoriteType = IFavorite | null

export interface ISearch {
  artists: IArtist[]
  tracks: ITrack[]
}

export interface IFavoriteTrackBody {
  trackId: string
}

export interface IGetRoleArtists {
  name: string
}

export interface ITrackId {
  addedAt: string
  albumId: string
  artist: {
    name: string
    artistPhoto: string | null
  }
  artistPhoto: null
  name: string
  artistId: string
  cover: string
  duration: string
  id: string
  listening: number
  playlistId: null
  title: string
  track: string
  uploadedAt: string
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
    const response = await axiosInstance.get<ITrackId>('/track', {
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
  getArtists: async (artistId: string) => {
    const response = await axiosInstance.get<IArtist>('/artist/all', {
      params: { artistId }
    })
    return response.data
  },
  getAllArtists: async () => {
    const response = await axiosInstance.get<IArtist[]>('/artist/all')
    return response.data
  },
  addTrackToFavorites: async (body: IFavoriteTrackBody) => {
    const response = await axiosInstance.post('/track/favorite/add', body)
    return response.data
  },
  removeTrackFromFavorites: async (body: IFavoriteTrackBody) => {
    const response = await axiosInstance.post('/track/favorite/remove', body)
    return response.data
  },
  listenedTrack: async (id: string) => {
    const response = await axiosInstance.post('/track/listening', {
      id
    })
    return response.data
  },
  search: async (value: string) => {
    const response = await axiosInstance.get<ISearch>(`/search?value=${value}`)
    return response.data
  },
  getRoleArtists: async (body: IGetRoleArtists) => {
    const response = await axiosInstance.post<IUser>('/artist', body)
    return response.data
  },
  uploadTrack: async (body: any) => {
    const response = await axiosInstance.post('/upload/track', body)
    return response.data
  },
  logout: async () => {
    await axiosInstance.post('/auth/logout')
  },
  getAlbumById: async (id: string) => {
    const response = await axiosInstance.get<IAlbum>(`/album/${id}`)
    return response.data
  }
}
