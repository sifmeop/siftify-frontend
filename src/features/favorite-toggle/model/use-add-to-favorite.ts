import { siftifyApi } from '#/shared/api'
import { IFavoriteTrackBody, ITrack } from '#/shared/api/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useAudioPlayerStore } from '#/shared/store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useAddTrackToFavorites = () => {
  const queryClient = useQueryClient()

  const updateFavoriteData = useAudioPlayerStore(
    (state) => state.updateFavoriteData
  )

  const updateData = async (data: IFavoriteTrackBody) => {
    await queryClient.cancelQueries({
      queryKey: QUERY_KEYS.ADD_TRACK_TO_FAVORITES
    })

    const previousTracks =
      (queryClient.getQueryData(QUERY_KEYS.GET_ALL_TRACKS) as
        | ITrack[]
        | undefined) ?? []

    const trackIndex = previousTracks?.findIndex(
      (track) => track.id === data.trackId
    )

    if (trackIndex !== -1) {
      const findTrack = previousTracks[trackIndex]

      const newData = {
        ...findTrack,
        favoriteBy: { ...data }
      } as ITrack

      const updatedDataTracks = previousTracks.with(trackIndex, newData)

      queryClient.setQueryData(QUERY_KEYS.GET_ALL_TRACKS, updatedDataTracks)
      updateFavoriteData(newData)

      return { previousTracks, newData }
    }
  }

  return useMutation({
    mutationKey: QUERY_KEYS.ADD_TRACK_TO_FAVORITES,
    mutationFn: (body: IFavoriteTrackBody) =>
      siftifyApi.addTrackToFavorites(body),
    onMutate: updateData,
    onSuccess: updateData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any, _, context) => {
      let message = 'Error deleting a track from favorites'
      if (typeof error?.response?.data?.message === 'string') {
        message = error.response.data.message
      }
      toast.error(message)
      queryClient.setQueryData(
        QUERY_KEYS.GET_ALL_TRACKS,
        context?.previousTracks
      )
      updateFavoriteData({ favoriteBy: null })
    }
  })
}
