import { useVerifyToken } from '#/entities/auth/api/verify-token'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getItemFromLocalStorage } from '../lib/localStorage'
import { UiFullScreenLoader } from '../ui/ui-full-screen-loader'

interface AuthGuardProps {
  children: React.ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  const { mutateAsync } = useVerifyToken()

  useEffect(() => {
    const handleVerify = async () => {
      const accessToken = getItemFromLocalStorage('accessToken')
      if (accessToken) {
        await mutateAsync()
          .catch(() => {
            navigate('/')
          })
          .finally(() => {
            setIsLoading(false)
          })
      } else {
        navigate('/')
        setIsLoading(false)
      }
    }
    handleVerify()
  }, [])

  if (isLoading) {
    return <UiFullScreenLoader />
  }

  return children
}
