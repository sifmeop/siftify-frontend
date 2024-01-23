import { siftifyApi } from '#/shared/api'
import { IPlaylist } from '#/shared/api/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeletePlaylist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: QUERY_KEYS.DELETE_PLAYLIST,
    mutationFn: (playlistId: string) => siftifyApi.deletePlaylist(playlistId),
    onMutate: async (playlistId) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.DELETE_PLAYLIST })

      const previousPlaylists = queryClient.getQueryData(
        QUERY_KEYS.GET_PLAYLISTS
      ) as IPlaylist[]

      const filterData = previousPlaylists.filter(
        (playlist) => playlist.id !== playlistId
      )

      queryClient.setQueryData(QUERY_KEYS.GET_PLAYLISTS, filterData)

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
