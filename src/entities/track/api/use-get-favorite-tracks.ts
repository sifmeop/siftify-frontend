import { siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useQuery } from '@tanstack/react-query'

export const useGetFavoriteTracks = () => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_FAVORITE_TRACKS,
    queryFn: siftifyApi.getFavoriteTracks
  })
}
