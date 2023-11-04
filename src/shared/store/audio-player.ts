import { Track } from '#/shared/api'
import { getUrl } from '#/shared/lib'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AudioPlayerStore {
  audioRef: HTMLAudioElement | null
  currentTrack: Track | null
  isPlaying: boolean
  setIsPlaying: (value: boolean) => void
  setCurrentTrack: (track: Track) => void
  closePlayer: () => void
}

export const useAudioPlayerStore = create<AudioPlayerStore>()(
  devtools((set, get) => ({
    audioRef: null,
    currentTrack: null,
    isPlaying: false,
    setIsPlaying: (value: boolean) => set(() => ({ isPlaying: value })),
    setCurrentTrack: (track: Track) => {
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
    }
  }))
)
