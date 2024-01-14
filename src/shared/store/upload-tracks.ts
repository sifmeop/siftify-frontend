import { IOption } from '#/entities/select-artists/select-artists'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface IUploadTrack {
  id: string
  title: string
  featuring: IOption[]
  track: File
}

export interface IUploadTrackStore {
  audioRef: HTMLAudioElement | null
  tracks: IUploadTrack[]
  setTracks: (tracks: IUploadTrack[]) => void
  deleteTrack: (id: string) => void
  playingTrack: IUploadTrack | null
  setPlayingTrack: (data: IUploadTrack) => void
  isPlaying: boolean
  setPlay: () => void
  setPause: () => void
  setChangeTitle: (id: string, title: string) => void
  setChangeFeaturing: (id: string, featuring: IOption[]) => void
}

export const useUploadTrackStore = create<IUploadTrackStore>()(
  devtools((set, get) => ({
    audioRef: null,
    tracks: [],
    playingTrack: null,
    isPlaying: false,
    setTracks: (tracks) => set(() => ({ tracks }), false, 'setTracks'),
    deleteTrack: (id: string) => {
      set(
        (state) => ({
          tracks: state.tracks.filter((t) => t.id !== id)
        }),
        false,
        'deleteTrack'
      )
    },
    setPlayingTrack: (data) => {
      const { audioRef } = get()
      audioRef?.pause()
      const blob = new Blob([data.track], { type: data.track.type })
      const audioURL = URL.createObjectURL(blob)
      const audio = new Audio(audioURL)
      audio.play()
      set(
        {
          audioRef: audio,
          playingTrack: data,
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
    },
    setChangeTitle: (id, title) => {
      const { tracks } = get()

      const findIndex = tracks.findIndex((t) => t.id === id)

      if (findIndex !== -1) {
        const newData = tracks.with(findIndex, {
          ...tracks[findIndex],
          title
        })
        set({ tracks: newData }, false, 'setChangeTitle')
      }
    },
    setChangeFeaturing: (id, featuring) => {
      const { tracks } = get()

      const findIndex = tracks.findIndex((t) => t.id === id)

      if (findIndex !== -1) {
        const newData = tracks.with(findIndex, {
          ...tracks[findIndex],
          featuring
        })
        set({ tracks: newData }, false, 'setChangeTitle')
      }
    }
  }))
)
