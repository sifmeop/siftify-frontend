import { siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useMutation } from '@tanstack/react-query'

export const useAddTrackToFavorites = () => {
  return useMutation({
    mutationKey: QUERY_KEYS.ADD_TRACK_TO_FAVORITES,
    mutationFn: siftifyApi.addTrackToFavorites
  })
}
