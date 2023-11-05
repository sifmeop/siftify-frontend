import { Track, siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useRemoveTrackFromFavorites = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: QUERY_KEYS.REMOVE_TRACK_FROM_FAVORITES,
    mutationFn: (id: string) => siftifyApi.removeTrackFromFavorites(id),
    onMutate: (id) => {
      const tracks: Track[] | undefined =
        queryClient.getQueryData(QUERY_KEYS.GET_ALL_TRACKS) ?? []

      const newDate = tracks.map((track) => {
        if (track.favoriteBy?.id === id) {
          return {
            ...track,
            favoriteBy: null
          }
        }
        return track
      })

      queryClient.setQueryData([...QUERY_KEYS.GET_ALL_TRACKS], newDate)
    }
  })
}
