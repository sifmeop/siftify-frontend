import { siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useMutation } from '@tanstack/react-query'

export const useListeningTrack = () => {
  return useMutation({
    mutationKey: QUERY_KEYS.LISTENING_TRACK,
    mutationFn: (id: string) => siftifyApi.listenedTrack(id)
  })
}
