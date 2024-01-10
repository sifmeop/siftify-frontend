import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { deleteItemFromLocalStorage } from '../lib/localStorage'

export const enum RoleEnum {
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
  role: RoleEnum
  photo?: string
  createdAt: Date
  updatedAt: Date
  access_token: string
  refresh_token: string
  artist?: IUserArtist
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
  setUser: (user: TypeUser) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  devtools((set) => ({
    user: null,
    isAuth: false,
    setUser: (user: TypeUser) => {
      if (user) {
        set(() => ({ user, isAuth: true }))
      } else {
        set(() => ({ user: null, isAuth: false }))
      }
    },
    logout: () => {
      deleteItemFromLocalStorage('accessToken')
      set(() => ({ user: null }))
    }
  }))
)
