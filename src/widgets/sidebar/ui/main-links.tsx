import { ROUTES } from '#/shared/constants'
import { cn } from '#/shared/lib'
import { GoHomeFill, GoSearch } from 'react-icons/go'
import { Link, useLocation } from 'react-router-dom'
import styles from './sidebar.module.scss'

export const Navigation = () => {
  const { pathname } = useLocation()

  return (
    <nav className={styles.navigation}>
      <ul>
        <li className='list-none mb-4'>
          <Link
            to={ROUTES.HOME}
            className={cn(styles.link, {
              [styles.activeLink]: pathname === ROUTES.HOME
            })}>
            <GoHomeFill size='30px' />
            <span>Главная</span>
          </Link>
        </li>
        <li className='list-none'>
          <Link
            to={ROUTES.SEARCH}
            className={cn(styles.link, {
              [styles.activeLink]: pathname === ROUTES.SEARCH
            })}>
            <GoSearch size='30px' />
            <span>Поиск</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
