import { ROUTES } from '#/shared/constants'
import clsx from 'clsx'
import { GoHomeFill, GoSearch } from 'react-icons/go'
import { Link, useLocation } from 'react-router-dom'

export const MainLinks = () => {
  const { pathname } = useLocation()

  return (
    <>
      <li
        className={clsx('list-none opacity-80', {
          'opacity-100': pathname === ROUTES.HOME
        })}>
        <Link to={ROUTES.HOME} className='flex items-center gap-2'>
          <GoHomeFill size='30px' />
          Home
        </Link>
      </li>
      <li
        className={clsx('list-none opacity-80', {
          'opacity-100': pathname === ROUTES.SEARCH
        })}>
        <Link to={ROUTES.SEARCH} className='flex items-center gap-2'>
          <GoSearch size='30px' />
          Search
        </Link>
      </li>
    </>
  )
}
