import { create } from 'zustand'
import { getItemFromLocalStorage } from '../lib/localStorage'

export interface IVolume {
  volume: string
  setVolume: (volume: string) => void
}

export const useVolumeStore = create<IVolume>((set) => ({
  volume: getItemFromLocalStorage('volume') ?? '50',
  setVolume: (volume: string) => set({ volume })
}))
