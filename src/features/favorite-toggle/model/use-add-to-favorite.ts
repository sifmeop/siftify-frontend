import { siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useUserStore } from '#/shared/store'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddTrackToFavorites = () => {
  const queryClient = useQueryClient()
  const addFavoriteTrackId = useUserStore((state) => state.addFavoriteTrackId)
  const removeFavoriteTrackId = useUserStore(
    (state) => state.removeFavoriteTrackId
  )

  return useMutation({
    mutationKey: QUERY_KEYS.ADD_TRACK_TO_FAVORITES,
    mutationFn: siftifyApi.addTrackToFavorites,
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEYS.GET_FAVORITE_TRACKS)
    },
    onMutate: async (trackId) => {
      addFavoriteTrackId(trackId)
    },
    onError: (_, trackId) => {
      removeFavoriteTrackId(trackId)
    }
  })
}
