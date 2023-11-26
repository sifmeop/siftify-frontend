import { useVerifyToken } from '#/entities/auth/api/verify-token'
import { useLayoutEffect, useState } from 'react'
import { getItemFromLocalStorage } from '../lib/localStorage'
import { UiFullScreenLoader } from '../ui/ui-full-screen-loader'

interface AuthGuardProps {
  children: React.ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const [isLoading, setIsLoading] = useState(true)

  const { mutateAsync } = useVerifyToken()

  useLayoutEffect(() => {
    const handleVerify = async () => {
      const accessToken = getItemFromLocalStorage('accessToken')
      if (accessToken) {
        await mutateAsync()
      }
      setIsLoading(false)
    }
    void handleVerify()
  }, [])

  if (isLoading) {
    return <UiFullScreenLoader />
  }

  return children
}
