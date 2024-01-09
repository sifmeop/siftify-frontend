import { siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useQuery } from '@tanstack/react-query'

export const useGetAllArtists = () => {
  return useQuery(QUERY_KEYS.GET_ARTISTS, () => siftifyApi.getAllArtists())
}
