import { ROUTES } from '#/shared/constants'
import { cn } from '#/shared/lib'
import { Link, useLocation } from 'react-router-dom'
import styles from './playlist.module.scss'

export const FavoriteTracks = () => {
  const { pathname } = useLocation()

  return (
    <Link
      to={ROUTES.FAVORITE_TRACKS}
      className={cn(styles.playlist_link, {
        [styles.playlist_link_active]: ROUTES.FAVORITE_TRACKS === pathname
      })}>
      <img
        width={48}
        height={48}
        src='/favorite-tracks-cover.png'
        alt='Favorite tracks cover'
      />
      <p>Любимые треки</p>
    </Link>
  )
}
