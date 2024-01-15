import { siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useQuery } from '@tanstack/react-query'

export const useGetAlbumById = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.ALBUM(id),
    queryFn: () => siftifyApi.getAlbumById(id)
  })
}
