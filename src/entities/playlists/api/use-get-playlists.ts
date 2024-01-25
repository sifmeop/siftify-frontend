import { siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useQuery } from '@tanstack/react-query'

export const useGetPlaylists = () => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_PLAYLISTS,
    queryFn: siftifyApi.getPlaylists,
    select: (data) => {
      const filterFixedPlaylists = data.filter((playlist) => playlist.isFixed)
      const fixedPlaylists = [...filterFixedPlaylists].sort(
        (a, b) =>
          new Date(a.isFixedAt!).getTime() - new Date(b.isFixedAt!).getTime()
      )
      const filterUnfixedPlaylists = data.filter(
        (playlist) => !playlist.isFixed
      )
      const unfixedPlaylists = [...filterUnfixedPlaylists].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )

      return [...fixedPlaylists, ...unfixedPlaylists]
    }
  })
}
