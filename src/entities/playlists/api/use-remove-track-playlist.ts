import { siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useMutation } from '@tanstack/react-query'

export const useRemoveTrackPlaylist = () => {
  return useMutation({
    mutationKey: QUERY_KEYS.REMOVE_TRACK_PLAYLIST,
    mutationFn: siftifyApi.removeTrackFromPlaylist
  })
}
