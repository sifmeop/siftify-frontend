import { siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useMutation } from '@tanstack/react-query'

export const useRemoveFromFavorites = () => {
  return useMutation({
    mutationKey: QUERY_KEYS.REMOVE_TRACK_FROM_FAVORITES,
    mutationFn: siftifyApi.removeTrackFromFavorites
  })
}
