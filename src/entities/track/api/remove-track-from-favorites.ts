import { Track, siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useRemoveTrackFromFavorites = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: QUERY_KEYS.REMOVE_TRACK_FROM_FAVORITES,
    mutationFn: (id: string) => siftifyApi.removeTrackFromFavorites(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.ADD_TRACK_TO_FAVORITES
      })

      const previousTracks: Track[] | undefined =
        queryClient.getQueryData(QUERY_KEYS.GET_ALL_TRACKS) ?? []

      const trackIndex = previousTracks?.findIndex((track) => track.id === id)

      if (trackIndex !== -1) {
        const findTrack = previousTracks[trackIndex]

        const newData = {
          ...findTrack,
          favoriteBy: null
        } as Track

        const updatedDataTracks = previousTracks.with(trackIndex, newData)

        queryClient.setQueryData(QUERY_KEYS.GET_ALL_TRACKS, updatedDataTracks)

        return { previousTracks, newData }
      }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        QUERY_KEYS.GET_ALL_TRACKS,
        context?.previousTracks
      )
    }
  })
}
