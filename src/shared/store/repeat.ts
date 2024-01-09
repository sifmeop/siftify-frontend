import { create } from 'zustand'

export type RepeatType = 'none' | 'all' | 'one'

export interface IRepeat {
  repeat: RepeatType
  setRepeat: (value: RepeatType) => void
}

export const useRepeatStore = create<IRepeat>((set) => ({
  repeat: 'all',
  setRepeat: (value: RepeatType) => set({ repeat: value })
}))
