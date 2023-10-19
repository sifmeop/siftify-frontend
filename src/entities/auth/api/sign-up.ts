import { SignUpDto, siftifyApi } from '#/shared/api'
import { SignError } from '#/shared/api/api'
import { ROUTES } from '#/shared/constants'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useUserStore } from '..'

export const useSignUp = () => {
  const navigate = useNavigate()
  const setUser = useUserStore().setUser

  return useMutation({
    mutationKey: ['sign-up'],
    mutationFn: (body: SignUpDto) => siftifyApi.signUp(body),
    onSuccess: (res) => {
      setUser(res?.data)
      toast.success('Success')
      navigate(ROUTES.HOME)
    },
    onError: (error: SignError) => {
      toast.error(
        error?.response?.data?.message ?? error?.message ?? 'Registration Error'
      )
    }
  })
}
