import { siftifyApi } from '#/shared/api'
import { QUERY_KEYS, ROUTES } from '#/shared/constants'
import { useUserStore } from '#/shared/store'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
  const navigate = useNavigate()
  const { logout } = useUserStore()

  const { mutateAsync } = useMutation({
    mutationKey: QUERY_KEYS.LOGOUT,
    mutationFn: () => siftifyApi.logout(),
    onSettled: () => {
      navigate(ROUTES.SIGN_IN)
      logout()
    }
  })

  const handleLogout = async () => {
    await mutateAsync()
  }

  return handleLogout
}
