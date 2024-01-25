import { ITrack, siftifyApi } from '#/shared/api'
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
    onMutate: async (trackId) => {
      const previousTracks = queryClient.getQueryData(
        QUERY_KEYS.GET_FAVORITE_TRACKS
      ) as ITrack[]

      const newData = previousTracks.filter((track) => track.id !== trackId)

      queryClient.setQueryData(QUERY_KEYS.GET_FAVORITE_TRACKS, newData)

      removeFavoriteTrackId(trackId)

      return { previousTracks }
    },
    onError: (_, trackId, context) => {
      queryClient.setQueryData(
        QUERY_KEYS.GET_FAVORITE_TRACKS,
        context?.previousTracks
      )

      addFavoriteTrackId(trackId)
    }
  })
}
