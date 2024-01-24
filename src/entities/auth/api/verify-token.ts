import { siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { deleteItemFromLocalStorage } from '#/shared/lib/localStorage'
import { useUserStore } from '#/shared/store'
import { useMutation } from '@tanstack/react-query'

export const useVerifyToken = () => {
  const { setUser, setFavoriteTracksIds } = useUserStore()

  return useMutation({
    mutationKey: QUERY_KEYS.VERIFY_TOKEN,
    mutationFn: () => siftifyApi.verifyToken(),
    onSuccess(res) {
      setUser(res.user)
      setFavoriteTracksIds(res.favoriteTracksIds)
    },
    onError(error: any) {
      if (error?.response?.data?.message === 'Unauthorized') {
        deleteItemFromLocalStorage('accessToken')
      }
    }
  })
}
