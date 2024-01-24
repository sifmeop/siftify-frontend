import { SignInDto, siftifyApi } from '#/shared/api'
import { SignError } from '#/shared/api/api'
import { ROUTES } from '#/shared/constants'
import { setItemToLocalStorage } from '#/shared/lib/localStorage'
import { useUserStore } from '#/shared/store'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useSignIn = () => {
  const navigate = useNavigate()
  const { setUser, setFavoriteTracksIds } = useUserStore()

  return useMutation({
    mutationKey: ['sign-in'],
    mutationFn: (body: SignInDto) => siftifyApi.signIn(body),
    onSuccess: (res) => {
      setUser(res.user)
      setFavoriteTracksIds(res.favoriteTracksIds)
      setItemToLocalStorage('accessToken', res.user.access_token)
      navigate(ROUTES.HOME)
    },
    onError: (error: SignError) => {
      toast.error(
        error?.response?.data?.message ?? error?.message ?? 'Login error'
      )
    }
  })
}
