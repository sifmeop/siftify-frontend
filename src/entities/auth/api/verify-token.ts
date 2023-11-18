import { siftifyApi } from '#/shared/api'
import { useUserStore } from '#/shared/store'
import { useMutation } from '@tanstack/react-query'

export const useVerifyToken = () => {
  const setUser = useUserStore((state) => state.setUser)

  return useMutation({
    mutationKey: ['verify-token'],
    mutationFn: () => siftifyApi.verifyToken(),
    onSuccess(data) {
      if (data) setUser(data)
    }
  })
}
