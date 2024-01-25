import { siftifyApi } from '#/shared/api'
import { IPlaylist } from '#/shared/api/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const usePinPlaylist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: QUERY_KEYS.PIN_PLAYLIST,
    mutationFn: siftifyApi.pinPlaylist,
    onMutate: async ({ playlistId, isFixed }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.PIN_PLAYLIST })

      const previousPlaylists = queryClient.getQueryData(
        QUERY_KEYS.GET_PLAYLISTS
      ) as IPlaylist[]

      const findPlaylistIndex = previousPlaylists.findIndex(
        (playlist) => playlist.id === playlistId
      )

      if (findPlaylistIndex === -1) {
        return
      }

      const newData = previousPlaylists.with(findPlaylistIndex, {
        ...previousPlaylists[findPlaylistIndex],
        isFixed,
        isFixedAt: isFixed ? new Date().toISOString() : undefined
      })

      queryClient.setQueryData(QUERY_KEYS.GET_PLAYLISTS, newData)

      return { previousPlaylists }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        QUERY_KEYS.GET_PLAYLISTS,
        context?.previousPlaylists
      )
    }
  })
}
