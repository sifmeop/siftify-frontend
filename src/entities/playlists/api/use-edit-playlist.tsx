import { siftifyApi } from '#/shared/api'
import { IPlaylist } from '#/shared/api/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useEditPlaylist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: QUERY_KEYS.EDIT_PLAYLIST,
    mutationFn: siftifyApi.editPlaylist,
    onSuccess: (res) => {
      const previousPlaylists = queryClient.getQueryData(
        QUERY_KEYS.GET_PLAYLISTS
      ) as IPlaylist[]

      const previousPlaylistsById = queryClient.getQueryData(
        QUERY_KEYS.GET_PLAYLISTS_BY_ID(res.id)
      ) as IPlaylist

      const newDataPlaylistById = {
        ...previousPlaylistsById,
        title: res.title,
        description: res.description,
        cover: res.cover
      }

      queryClient.setQueryData(
        QUERY_KEYS.GET_PLAYLISTS_BY_ID(res.id),
        newDataPlaylistById
      )

      const findPlaylistIndex = previousPlaylists.findIndex(
        (playlist) => playlist.id === res.id
      )

      if (findPlaylistIndex !== -1) {
        const newData = previousPlaylists.with(findPlaylistIndex, {
          ...previousPlaylists[findPlaylistIndex],
          title: res.title,
          description: res.description,
          cover: res.cover
        })

        queryClient.setQueryData(QUERY_KEYS.GET_PLAYLISTS, newData)
      }
    }
  })
}
