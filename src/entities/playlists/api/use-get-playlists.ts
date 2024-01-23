import { siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useQuery } from '@tanstack/react-query'

export const useGetPlaylists = () => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_PLAYLISTS,
    queryFn: siftifyApi.getPlaylists
  })
}
