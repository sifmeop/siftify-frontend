import { siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useQuery } from '@tanstack/react-query'

export const useGetArtist = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_ARTIST(id),
    queryFn: () => siftifyApi.getArtist(id)
  })
}
