import { siftifyApi } from '#/shared/api'
import { deleteItemFromLocalStorage } from '#/shared/lib/localStorage'
import { useUserStore } from '#/shared/store'
import { useMutation } from '@tanstack/react-query'

export const useVerifyToken = () => {
  const setUser = useUserStore((state) => state.setUser)

  return useMutation({
    mutationKey: ['verify-token'],
    mutationFn: () => siftifyApi.verifyToken(),
    onSuccess(data) {
      if (data) setUser(data)
    },
    onError(error: any) {
      if (error?.response?.data?.message === 'Unauthorized') {
        deleteItemFromLocalStorage('accessToken')
      }
    }
  })
}
