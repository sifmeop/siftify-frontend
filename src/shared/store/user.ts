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
  artistId?: string
  artistName?: string
}

type TypeUser = IUser | null

interface UserState {
  user: TypeUser
  setUser: (user: TypeUser) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  devtools((set) => ({
    user: null,
    setUser: (user: TypeUser) => set(() => ({ user })),
    logout: () => {
      deleteItemFromLocalStorage('accessToken')
      set(() => ({ user: null }))
    }
  }))
)
