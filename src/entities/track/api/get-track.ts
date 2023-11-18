import { siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useQuery } from '@tanstack/react-query'

export const useGetTrack = (trackId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_TRACK,
    queryFn: () => siftifyApi.getTrack(trackId)
  })
}
