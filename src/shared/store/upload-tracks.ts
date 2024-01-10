import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface IUploadTrack {
  audioRef: HTMLAudioElement | null
  tracks: File[]
  setTracks: (tracks: File[]) => void
  deleteTrack: (track: File) => void
  playingTrack: File | null
  setPlayingTrack: (file: File) => void
  isPlaying: boolean
  setPlay: () => void
  setPause: () => void
}

export const useUploadTrackStore = create<IUploadTrack>()(
  devtools((set, get) => ({
    audioRef: null,
    tracks: [],
    playingTrack: null,
    isPlaying: false,
    setTracks: (tracks) =>
      set(
        (state) => ({ tracks: [...state.tracks, ...tracks] }),
        false,
        'setTracks'
      ),
    deleteTrack: (track: File) => {
      set(
        (state) => ({
          tracks: state.tracks.filter((t) => t.name !== track.name)
        }),
        false,
        'deleteTrack'
      )
    },
    setPlayingTrack: (file) => {
      const { audioRef } = get()
      audioRef?.pause()
      const blob = new Blob([file], { type: file.type })
      const audioURL = URL.createObjectURL(blob)
      const audio = new Audio(audioURL)
      audio.play()
      set(
        {
          audioRef: audio,
          playingTrack: file,
          isPlaying: true
        },
        false,
        'setPlayingTrack'
      )
    },
    setPlay: () => {
      const { audioRef } = get()
      audioRef?.play()
      set({ isPlaying: true }, false, 'setPlay True')
    },
    setPause: () => {
      const { audioRef } = get()
      audioRef?.pause()
      set({ isPlaying: false }, false, 'setPlay False')
    }
  }))
)
