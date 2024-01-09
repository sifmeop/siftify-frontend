import { ROUTES } from '#/shared/constants'
import { useUser } from '#/shared/hooks'
import { RoleEnum } from '#/shared/store/user'
import { Link } from 'react-router-dom'

export const UploadTracks = () => {
  const { role } = useUser()

  if (role === RoleEnum.USER) {
    return null
  }

  return <Link to={ROUTES.UPLOAD}>Загрузить трек</Link>
}
