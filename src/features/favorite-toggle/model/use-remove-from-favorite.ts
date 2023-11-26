import { ITrack, siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useAudioPlayerStore } from '#/shared/store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient()

  const updateFavoriteData = useAudioPlayerStore(
    (state) => state.updateFavoriteData
  )

  return useMutation({
    mutationKey: QUERY_KEYS.REMOVE_TRACK_FROM_FAVORITES,
    mutationFn: (id: string) => siftifyApi.removeTrackFromFavorites(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.ADD_TRACK_TO_FAVORITES
      })

      const previousTracks: ITrack[] | undefined =
        queryClient.getQueryData(QUERY_KEYS.GET_ALL_TRACKS) ?? []

      const trackIndex = previousTracks?.findIndex((track) => track.id === id)

      if (trackIndex !== -1) {
        const findTrack = previousTracks[trackIndex]

        const previousData = findTrack

        const newData = {
          ...findTrack,
          favoriteBy: null
        } as ITrack

        const updatedDataTracks = previousTracks.with(trackIndex, newData)

        queryClient.setQueryData(QUERY_KEYS.GET_ALL_TRACKS, updatedDataTracks)
        updateFavoriteData(newData)

        return { previousTracks, newData, previousData }
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any, _, context) => {
      let message = 'Error remove track from favorites'
      if (typeof error?.response?.data?.message === 'string') {
        message = error.response.data.message
      }
      toast.error(message)
      queryClient.setQueryData(
        QUERY_KEYS.GET_ALL_TRACKS,
        context?.previousTracks
      )
      updateFavoriteData(context!.previousData)
    }
  })
}
