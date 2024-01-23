import { getUrl } from '#/shared/lib'
import { create } from 'zustand'
import { ITrack } from '../api'

type FavoriteByUpdateData = Partial<ITrack>

interface AudioPlayerStore {
  audioRef: HTMLAudioElement | null
  playingTrack: ITrack | null
  isPlaying: boolean
  setIsPlaying: (value: boolean) => void
  setPlay: () => void
  setPause: () => void
  setPlayingTrack: (track: ITrack) => void
  updateFavoriteData: (data: FavoriteByUpdateData) => void
  closePlayer: () => void
}

export const useAudioPlayerStore = create<AudioPlayerStore>((set, get) => ({
  audioRef: null,
  playingTrack: null,
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
  setPlayingTrack: (track) => {
    const { setPause, setPlay } = get()

    setPause()

    set(
      {
        playingTrack: track,
        audioRef: new Audio(getUrl(track.track))
      },
      false,
      'setPlayingTrack'
    )

    setPlay()
  },
  closePlayer: () => {
    const { audioRef } = get()
    audioRef?.pause()

    set(() => ({
      audioRef: null,
      playingTrack: null,
      isPlaying: false
    }))
  },
  updateFavoriteData: (data: FavoriteByUpdateData) => {
    const { playingTrack } = get()

    if (data.title === playingTrack?.title) {
      const updateData = { ...playingTrack, ...data }

      set({ playingTrack: updateData as ITrack })
    }
  }
}))
