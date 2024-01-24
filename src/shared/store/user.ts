import { create } from 'zustand'
import { deleteItemFromLocalStorage } from '../lib/localStorage'
import { devtools } from 'zustand/middleware'

export const enum EnumRole {
  USER = 'USER',
  ARTIST = 'ARTIST',
  ADMIN = 'ADMIN'
}

export interface IUser {
  uId: number
  id: string
  email: string
  password: string
  username: string
  role: EnumRole
  photo?: string
  createdAt: Date
  updatedAt: Date
  access_token: string
  refresh_token: string
  artist?: IUserArtist
  favoriteTracksIds: string[]
}

interface IUserArtist {
  id: string
  artistPhoto: string | null
  name: string
  listening: number
  userId: string
}

type TypeUser = IUser | null

interface UserState {
  user: TypeUser
  isAuth: boolean
  favoriteTracksIds: string[]
  setUser: (user: TypeUser) => void
  logout: () => void
  addFavoriteTrackId: (trackId: string) => void
  removeFavoriteTrackId: (trackId: string) => void
  setFavoriteTracksIds: (favoriteTracksIds: string[]) => void
}

export const useUserStore = create<UserState>()(
  devtools((set, get) => ({
    user: null,
    isAuth: false,
    favoriteTracksIds: [],
    setUser: (user) => {
      if (user) {
        set(() => ({ user, isAuth: true }))
      } else {
        set(() => ({ user: null, isAuth: false }))
      }
    },
    logout: () => {
      deleteItemFromLocalStorage('accessToken')
      set(() => ({ user: null }))
    },
    addFavoriteTrackId: (trackId) => {
      const { favoriteTracksIds } = get()

      set({
        favoriteTracksIds: [trackId, ...favoriteTracksIds]
      })
    },
    removeFavoriteTrackId: (trackId) => {
      const { favoriteTracksIds } = get()

      const newData = favoriteTracksIds.filter((id) => id !== trackId)

      set({
        favoriteTracksIds: newData
      })
    },
    setFavoriteTracksIds: (favoriteTracksIds) => {
      set({ favoriteTracksIds })
    }
  }))
)
