import { siftifyApi } from '#/shared/api'
import { IAddTrack, Track } from '#/shared/api/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddTrackToFavorites = () => {
  const queryClient = useQueryClient()

  const updateData = (data: IAddTrack) => {
    const previousData =
      (queryClient.getQueryData(QUERY_KEYS.GET_ALL_TRACKS) as
        | Track[]
        | undefined) ?? []
    const trackIndex = previousData.findIndex(
      (track) => track.id === data.trackId
    )

    if (trackIndex !== -1) {
      const updatedTrack = {
        ...previousData[trackIndex],
        favoriteBy: { ...data }
      }

      const newData = [
        ...previousData.slice(0, trackIndex),
        updatedTrack,
        ...previousData.slice(trackIndex + 1)
      ]

      queryClient.setQueryData(QUERY_KEYS.GET_ALL_TRACKS, newData)
    }
  }

  return useMutation({
    mutationKey: QUERY_KEYS.ADD_TRACK_TO_FAVORITES,
    mutationFn: (body: IAddTrack) => siftifyApi.addTrackToFavorites(body),
    onMutate: updateData,
    onSuccess: updateData
  })
}
