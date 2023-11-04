import { siftifyApi } from '#/shared/api'
import { useQuery } from '@tanstack/react-query'

export const useGetAllTracks = () => {
  return useQuery({
    queryKey: ['get-all-tracks'],
    queryFn: siftifyApi.getAllTracks
  })
}
