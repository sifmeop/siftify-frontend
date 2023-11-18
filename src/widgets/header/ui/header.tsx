import { ROUTES } from '#/shared/constants'
import { useUserStore } from '#/shared/store'
import { CgProfile } from 'react-icons/cg'
import { FiLogIn } from 'react-icons/fi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './header.module.scss'

export const Header = () => {
  const { user } = useUserStore()
  const navigate = useNavigate()
  const location = useLocation()

  const getLoginBtn = () => {
    // if (user === 'loading') {
    //   return (
    //     <Skeleton
    //       sx={{ bgcolor: 'grey.700' }}
    //       variant='rounded'
    //       animation='wave'
    //       width={210}
    //       height={30}
    //     />
    //   )
    // }

    if (!user) {
      return (
        <Link to={ROUTES.SIGN_IN} className='flex items-center gap-2'>
          <FiLogIn size='30px' />
          Войти
        </Link>
      )
    }

    return (
      <Link to={ROUTES.PROFILE} className='flex items-center gap-2'>
        <CgProfile size='30px' />
        Профиль
      </Link>
    )
  }

  const handleBack = () => {
    console.log(location, 'location')
    navigate(-1)
  }

  return (
    <header className={styles.header}>
      <button onClick={handleBack}>Go back</button>
      {getLoginBtn()}
    </header>
  )
}
