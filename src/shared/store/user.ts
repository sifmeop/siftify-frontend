import { create } from 'zustand'

export interface IUser {
  uId: number
  id: string
  email: string
  password: string
  username: string
  role: string
  created_at: Date
  updated_at: Date
  access_token: string
  refresh_token: string
}

type TypeUser = IUser | null

interface UserState {
  user: TypeUser
  setUser: (user: TypeUser) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: TypeUser) => set(() => ({ user }))
}))
