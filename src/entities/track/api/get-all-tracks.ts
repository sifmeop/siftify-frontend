import { siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useQuery } from '@tanstack/react-query'

export const useGetAllTracks = () => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_ALL_TRACKS,
    queryFn: siftifyApi.getAllTracks
  })
}
