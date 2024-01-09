import { ROUTES } from '#/shared/constants'
import { usePageRedirectOnMismatch } from '#/shared/hooks/usePageRedirectOnMismatch'
import { cn } from '#/shared/lib'
import { GoHomeFill, GoSearch } from 'react-icons/go'
import { Link, useLocation } from 'react-router-dom'
import styles from './sidebar.module.scss'

export const Navigation = () => {
  const { pathname } = useLocation()
  const { handleNavigate } = usePageRedirectOnMismatch()

  return (
    <nav className={styles.navigation}>
      <ul>
        <li className='list-none mb-4'>
          <Link
            to={ROUTES.HOME}
            onClick={handleNavigate}
            className={cn(styles.link, {
              [styles.activeLink]: pathname === ROUTES.HOME
            })}>
            <GoHomeFill size='30px' />
            <span>Home</span>
          </Link>
        </li>
        <li className='list-none'>
          <Link
            to={ROUTES.SEARCH}
            onClick={handleNavigate}
            className={cn(styles.link, {
              [styles.activeLink]: pathname === ROUTES.SEARCH
            })}>
            <GoSearch size='30px' />
            <span>Search</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
