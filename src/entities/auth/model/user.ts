import { create } from 'zustand'

export interface User {
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

interface UserState {
  user: User | null
  setUser: (user: User) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => set(() => ({ user }))
}))
