import { useVerifyToken } from '#/entities/auth/api/verify-token'
import { useLayoutEffect, useState } from 'react'
import { UiFullScreenLoader } from '../ui/ui-full-screen-loader'

interface AuthGuardProps {
  children: React.ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const [isLoading, setIsLoading] = useState(true)

  const { mutateAsync } = useVerifyToken()

  useLayoutEffect(() => {
    const handleVerify = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) await mutateAsync().finally(() => setIsLoading(false))
      } catch (error) {
        console.log('Local storage error', error)
      }
    }
    void handleVerify()
  }, [])

  if (isLoading) {
    return <UiFullScreenLoader />
  }

  return children
}
