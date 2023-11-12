import { useUserStore } from '#/entities/auth'
import { siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useQuery } from '@tanstack/react-query'

export const useGetAllTracks = () => {
  const { user } = useUserStore()

  const userId = user?.id ?? '6550bf1e0dae1095ed4bdccf'

  return useQuery({
    queryKey: QUERY_KEYS.GET_ALL_TRACKS,
    queryFn: () => siftifyApi.getAllTracks(userId)
  })
}
