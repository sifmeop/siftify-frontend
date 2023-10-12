import { SignUpDto, siftifyApi } from '#/shared/api'
import { useMutation } from '@tanstack/react-query'

export const useSignUp = () =>
  useMutation({
    mutationKey: ['sign-up'],
    mutationFn: (body: SignUpDto) => siftifyApi.signUp(body)
  })
