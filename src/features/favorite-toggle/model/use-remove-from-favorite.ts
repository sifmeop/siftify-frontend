import { siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useUserStore } from '#/shared/store'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient()
  const addFavoriteTrackId = useUserStore((state) => state.addFavoriteTrackId)
  const removeFavoriteTrackId = useUserStore(
    (state) => state.removeFavoriteTrackId
  )

  return useMutation({
    mutationKey: QUERY_KEYS.REMOVE_TRACK_FROM_FAVORITES,
    mutationFn: siftifyApi.removeTrackFromFavorites,
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEYS.GET_FAVORITE_TRACKS)
    },
    onMutate: async (trackId) => {
      removeFavoriteTrackId(trackId)
    },
    onError: (_, trackId) => {
      addFavoriteTrackId(trackId)
    }
  })
}
