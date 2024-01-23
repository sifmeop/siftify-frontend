import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { useAudioPlayerStore } from '.'
import { ITrack } from '../api'
import { IQueueTrack } from '../api/api'
import { generateRandomId, shuffleTracks } from '../lib'

export interface IQueue {
  lastQueueTrackIndex: number | null
  prevQueueList: ITrack[]
  userQueueList: IQueueTrack[]
  queueListId: string | null
  setUserQueueList: (queueList: IQueueTrack[]) => void
  queueList: ITrack[]
  addTrackToQueue: (track: ITrack) => void
  removeTrackFromQueue: (queueId: string) => void
  setQueueList: ({ queueList, queueListId }: ISetQueueList) => void
  shuffleQueue: () => void
  unShuffleQueue: () => void
  clearQueue: () => void
  nextTrack: (track?: ITrack, type?: 'queue' | 'user') => void
  prevTrack: () => void
}

interface ISetQueueList {
  queueList: ITrack[]
  queueListId?: string
}

export const useQueueStore = create<IQueue>()(
  devtools((set, get) => ({
    lastQueueTrackIndex: null,
    queueListId: null,
    prevQueueList: [],
    userQueueList: [],
    queueList: [],
    setQueueList: ({ queueList, queueListId }) => {
      if (queueListId) {
        set({ queueList, queueListId }, false, 'setQueueList')
      } else {
        set({ queueList }, false, 'setQueueList')
      }
    },
    setUserQueueList: (userQueueList) => {
      const newUserQueueList = userQueueList.map((track) => ({
        ...track,
        queueTrackId: generateRandomId()
      }))
      set({ userQueueList: newUserQueueList }, false, 'setUserQueueList')
    },
    addTrackToQueue: (track) => {
      const { userQueueList } = get()

      const newQueueList = [
        { ...track, queueTrackId: generateRandomId() },
        ...userQueueList
      ]

      set({ userQueueList: newQueueList }, false, 'addTrackToQueue')
    },
    removeTrackFromQueue: (queueId) => {
      const { queueList } = get()

      const newQueueList = queueList.filter((track) => track.id !== queueId)

      set({ queueList: newQueueList }, false, 'removeTrackFromQueue')
    },
    shuffleQueue: () => {
      const { queueList } = get()

      const newQueueList = shuffleTracks(queueList)

      set(
        { queueList: newQueueList, prevQueueList: queueList },
        false,
        'shuffleQueue'
      )
    },
    unShuffleQueue: () => {
      const { prevQueueList } = get()

      set(
        { queueList: prevQueueList, prevQueueList: [] },
        false,
        'unShuffleQueue'
      )
    },
    clearQueue: () => set({ userQueueList: [] }, false, 'clearQueue'),
    nextTrack: (track, type = 'queue') => {
      const { userQueueList, setUserQueueList, queueList, setQueueList } = get()
      const { setPlayingTrack } = useAudioPlayerStore.getState()

      if (track) {
        setPlayingTrack(track)

        if (type === 'queue' && queueList.length) {
          const findIndexTrack = queueList.findIndex((t) => t.id === track.id)

          if (findIndexTrack !== -1) {
            const newQueueList = [
              ...queueList.slice(findIndexTrack + 1),
              ...queueList.slice(0, findIndexTrack + 1)
            ]
            setQueueList({ queueList: newQueueList })
          }
        }

        if (type === 'user' && userQueueList.length) {
          const findIndexTrack = userQueueList.findIndex(
            (t) => t.id === track.id
          )

          if (findIndexTrack !== -1) {
            const newUserQueueList = userQueueList.slice(findIndexTrack + 1)
            setUserQueueList(newUserQueueList)
          }
        }

        return
      }

      if (userQueueList.length) {
        setPlayingTrack(userQueueList[0])
        const newUserQueueList = userQueueList.slice(1)
        setUserQueueList(newUserQueueList)
        return
      }

      if (queueList.length) {
        setPlayingTrack(queueList[0])
        const newUserQueueList = [
          ...queueList.slice(1),
          ...queueList.slice(0, 1)
        ]
        setQueueList({ queueList: newUserQueueList })
      }
    },
    prevTrack: () => {}
  }))
)
