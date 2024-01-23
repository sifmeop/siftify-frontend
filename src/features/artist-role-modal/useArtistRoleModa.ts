import { SignError, siftifyApi } from '#/shared/api/api'
import { useUserStore } from '#/shared/store'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useArtistRoleModal = () => {
  const setUser = useUserStore((state) => state.setUser)

  return useMutation({
    mutationKey: ['get-role-artist'],
    mutationFn: (body: FormData) => siftifyApi.getRoleArtists(body),
    onSuccess: (res) => {
      setUser(res)
      toast.success('Роль артиста получена')
    },
    onError: (error: SignError) => {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          'Ошибка получения роли артиста'
      )
    }
  })
}
