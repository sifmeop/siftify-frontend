import { useQueueStore } from '#/shared/store'

export const useAddToQueue = () => {
  const addToQueue = useQueueStore((state) => state.addTrackToQueue)

  const addToQueue = (trackId: string) => {}

  return {}
}
