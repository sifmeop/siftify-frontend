import { useUserStore } from '#/entities/auth'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '../constants'

interface AuthGuardProps {
  children: React.ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user } = useUserStore()

  if (!user) {
    return <Navigate to={ROUTES.SIGN_IN} replace />
  }

  return <>{children}</>
}
