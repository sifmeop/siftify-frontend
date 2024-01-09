import { getUrl } from '#/shared/lib'
import { create } from 'zustand'
import { ITrack } from '../api'

type FavoriteByUpdateData = Partial<ITrack>

interface AudioPlayerStore {
  audioRef: HTMLAudioElement | null
  currentTrack: ITrack | null
  isPlaying: boolean
  setIsPlaying: (value: boolean) => void
  setPlay: () => void
  setPause: () => void
  setCurrentTrack: (track: ITrack) => void
  updateFavoriteData: (data: FavoriteByUpdateData) => void
  closePlayer: () => void
}

export const useAudioPlayerStore = create<AudioPlayerStore>((set, get) => ({
  audioRef: null,
  currentTrack: null,
  isPlaying: false,
  setIsPlaying: (value: boolean) => {
    const { audioRef } = get()

    if (value) {
      audioRef?.play()
    } else {
      audioRef?.pause()
    }

    set(() => ({ isPlaying: value }), false, 'setIsPlaying')
  },
  setPlay: () => {
    const { audioRef } = get()

    audioRef?.play()

    set(() => ({ isPlaying: true }), false, 'setPlay')
  },
  setPause: () => {
    const { audioRef } = get()

    audioRef?.pause()

    set(() => ({ isPlaying: false }), false, 'setPause')
  },
  setCurrentTrack: (track: ITrack) => {
    const { setPause, setPlay } = get()

    setPause()

    set(
      {
        currentTrack: track,
        audioRef: new Audio(getUrl(track.track))
      },
      false,
      'setCurrentTrack'
    )

    setPlay()
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
  }
}))
