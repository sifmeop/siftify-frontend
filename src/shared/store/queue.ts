import { create } from 'zustand'
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
  nextTrackFromQueue: (track: ITrack) => void
  nextTrackFromUserQueue: (track: ITrack) => void
  nextTrack: (track?: ITrack) => void
  prevTrack: () => void
}

interface ISetQueueList {
  queueList: ITrack[]
  queueListId?: string
}

export const useQueueStore = create<IQueue>((set, get) => ({
  lastQueueTrackIndex: null,
  queueListId: null,
  prevQueueList: [],
  userQueueList: [],
  queueList: [],
  setQueueList: ({ queueList, queueListId }: ISetQueueList) => {
    if (queueListId) {
      set({ queueList, queueListId }, false, 'setQueueList')
    } else {
      set({ queueList }, false, 'setQueueList')
    }
  },
  setUserQueueList: (userQueueList: IQueueTrack[]) => {
    const newUserQueueList = userQueueList.map((track) => ({
      ...track,
      queueTrackId: generateRandomId()
    }))
    set({ userQueueList: newUserQueueList }, false, 'setUserQueueList')
  },
  addTrackToQueue: (track: ITrack) => {
    const { userQueueList } = get()

    const newQueueList = [
      { ...track, queueTrackId: generateRandomId() },
      ...userQueueList
    ]

    set({ userQueueList: newQueueList }, false, 'addTrackToQueue')
  },
  removeTrackFromQueue: (queueId: string) => {
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
  nextTrack: (track?: ITrack) => {
    const { userQueueList, setUserQueueList, queueList, setQueueList } = get()
    const { setCurrentTrack } = useAudioPlayerStore.getState()

    if (track) {
      setCurrentTrack(track)
      return
    }

    if (userQueueList.length) {
      setCurrentTrack(userQueueList[0])
      const newUserQueueList = [...userQueueList.slice(1)]
      setUserQueueList(newUserQueueList)
      return
    }

    if (queueList.length) {
      setCurrentTrack(queueList[0])
      const newUserQueueList = [...queueList.slice(1), ...queueList.slice(0, 1)]
      setQueueList({ queueList: newUserQueueList })
    }
  },
  prevTrack: () => {},
  nextTrackFromQueue: (track: ITrack) => {},
  nextTrackFromUserQueue: (track: ITrack) => {}
}))
