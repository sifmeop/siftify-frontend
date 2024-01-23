import { siftifyApi } from '#/shared/api'
import { IPlaylist } from '#/shared/api/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreatePlaylist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: QUERY_KEYS.CREATE_PLAYLIST,
    mutationFn: siftifyApi.createPlaylist,
    onSuccess: async (playlist) => {
      const previousPlaylists = queryClient.getQueryData(
        QUERY_KEYS.GET_PLAYLISTS
      ) as IPlaylist[]

      const newData = [...previousPlaylists, playlist]

      queryClient.setQueryData(QUERY_KEYS.GET_PLAYLISTS, newData)
    }
  })
}
