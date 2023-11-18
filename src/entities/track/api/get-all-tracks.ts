import { siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useUserStore } from '#/shared/store'
import { useQuery } from '@tanstack/react-query'

export const useGetAllTracks = () => {
  const { user } = useUserStore()

  const userId = user?.id

  return useQuery({
    queryKey: QUERY_KEYS.GET_ALL_TRACKS,
    queryFn: () => siftifyApi.getAllTracks(userId)
  })
}
