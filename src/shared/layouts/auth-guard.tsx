import { useVerifyToken } from '#/entities/auth/api/verify-token'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants'
import {
  deleteItemFromLocalStorage,
  getItemFromLocalStorage
} from '../lib/localStorage'
import { useUserStore } from '../store'
import { UiFullScreenLoader } from '../ui/ui-full-screen-loader'

interface AuthGuardProps {
  children: React.ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const isAuth = useUserStore((state) => state.isAuth)

  const { mutateAsync } = useVerifyToken()

  useEffect(() => {
    const handleVerify = async () => {
      const accessToken = getItemFromLocalStorage('accessToken')
      if (accessToken) {
        await mutateAsync()
          .then(() => {
            setIsLoading(false)
          })
          .catch(() => {
            navigate(ROUTES.SIGN_IN)
            setIsLoading(false)
            deleteItemFromLocalStorage('accessToken')
          })
      } else {
        navigate(ROUTES.SIGN_IN)
        setIsLoading(false)
      }
    }
    if (isAuth) {
      setIsLoading(false)
    } else {
      handleVerify()
    }
  }, [])

  if (isLoading) {
    return <UiFullScreenLoader />
  }

  return children
}
