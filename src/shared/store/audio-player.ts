import { getUrl } from '#/shared/lib'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { ITrack } from '../api'
import { getItemFromLocalStorage } from '../lib/localStorage'

type FavoriteByUpdateData = Partial<ITrack>

interface AudioPlayerStore {
  audioRef: HTMLAudioElement | null
  currentTrack: ITrack | null
  isPlaying: boolean
  setIsPlaying: (value: boolean) => void
  setCurrentTrack: (track: ITrack) => void
  updateFavoriteData: (data: FavoriteByUpdateData) => void
  closePlayer: () => void
  volume: string
  setVolume: (volume: string) => void
}

export const useAudioPlayerStore = create<AudioPlayerStore>()(
  devtools((set, get) => ({
    audioRef: null,
    currentTrack: null,
    isPlaying: false,
    setIsPlaying: (value: boolean) => set(() => ({ isPlaying: value })),
    setCurrentTrack: (track: ITrack) => {
      const { audioRef, currentTrack, isPlaying } = get()

      if (currentTrack?.track !== track?.track) {
        audioRef?.pause()

        set({
          currentTrack: track,
          isPlaying: true,
          audioRef: new Audio(getUrl(track.track))
        })
      } else {
        if (isPlaying) {
          set({ isPlaying: false })
          audioRef?.pause()
        } else {
          set({ isPlaying: true })
          audioRef?.play()
        }
      }
    },
    closePlayer: () => {
      const { audioRef } = get()
      audioRef?.pause()

      set(() => ({
        audioRef: null,
        currentTrack: null,
        isPlaying: false
      }))
    },
    updateFavoriteData: (data: FavoriteByUpdateData) => {
      const { currentTrack } = get()

      if (data.title === currentTrack?.title) {
        const updateData = { ...currentTrack, ...data }

        set({ currentTrack: updateData as ITrack })
      }
    },
    volume: getItemFromLocalStorage('volume') ?? '50',
    setVolume: (volume: string) => set({ volume })
  }))
)
