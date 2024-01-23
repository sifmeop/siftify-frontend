import { siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useQuery } from '@tanstack/react-query'

export const useGetPlaylistById = (playlistId?: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_PLAYLISTS_BY_ID(playlistId!),
    queryFn: () => siftifyApi.getPlaylistById(playlistId!),
    enabled: !!playlistId
  })
}
