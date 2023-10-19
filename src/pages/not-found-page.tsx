import { useUserStore } from '#/entities/auth'
import { ROUTES } from '#/shared/constants'
import { Navigate } from 'react-router-dom'

export const NotFoundPage = () => {
  const { user } = useUserStore()

  if (user) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  return <Navigate to={ROUTES.SIGN_IN} replace />
}
