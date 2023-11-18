import { ROUTES } from '#/shared/constants'
import { Navigate } from 'react-router-dom'

export const NotFoundPage = () => {
  return <Navigate to={ROUTES.HOME} replace />
}
