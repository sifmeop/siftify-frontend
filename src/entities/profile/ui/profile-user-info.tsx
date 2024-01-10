import { useLogout } from '#/entities/user/model/use-logout'
import { useUser } from '#/shared/hooks'
import { UiButton } from '#/shared/ui/UiButton'
import { format } from 'date-fns'
import styles from './profile-user-info.module.scss'

export const ProfileUserInfo = () => {
  const user = useUser()

  const createdAt = format(user.createdAt, 'dd.MM.yyyy')

  const logout = useLogout()

  return (
    <>
      <div className={styles.container}>
        <div className={styles.avatar}>
          <img
            width={200}
            height={200}
            src={user?.photo ?? '/default-avatar.jpg'}
            alt={user.username}
          />
        </div>
        <table className={styles.info}>
          <tbody>
            <tr>
              <td>ID</td>
              <td>{user.uId}</td>
            </tr>
            <tr>
              <td>Имя пользователя</td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>Дата регистрации</td>
              <td>{createdAt}</td>
            </tr>
            {user?.artist?.name && (
              <tr>
                <td>Псевдоним артиста</td>
                <td>{user.artist.name}</td>
              </tr>
            )}
          </tbody>
        </table>
        <UiButton onClick={logout}>Logout</UiButton>
      </div>
    </>
  )
}
