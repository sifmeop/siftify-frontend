import { SignInDto, siftifyApi } from '#/shared/api'
import { SignError } from '#/shared/api/api'
import { ROUTES } from '#/shared/constants'
import { useUserStore } from '#/shared/store'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useSignIn = () => {
  const navigate = useNavigate()
  const setUser = useUserStore().setUser

  return useMutation({
    mutationKey: ['sign-in'],
    mutationFn: (body: SignInDto) => siftifyApi.signIn(body),
    onSuccess: (res) => {
      setUser(res?.data)
      try {
        localStorage.setItem('accessToken', res?.data.access_token)
      } catch (error) {
        console.log('Local storage error', error)
      }
      toast.success('Success')
      navigate(ROUTES.HOME)
    },
    onError: (error: SignError) => {
      toast.error(
        error?.response?.data?.message ?? error?.message ?? 'Login error'
      )
    }
  })
}
