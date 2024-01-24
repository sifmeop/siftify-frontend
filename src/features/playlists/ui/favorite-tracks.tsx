import { useGetFavoriteTracks } from '#/entities/track'
import { ROUTES } from '#/shared/constants'
import { cn } from '#/shared/lib'
import { getNameCount } from '#/shared/lib/getNameCountTracks'
import { UiDot } from '#/shared/ui/ui-dot'
import { Link, useLocation } from 'react-router-dom'
import styles from './playlist.module.scss'

export const FavoriteTracks = () => {
  const { pathname } = useLocation()
  const { data } = useGetFavoriteTracks()
  const countTracks = data?.length ?? 0

  return (
    <Link
      to={ROUTES.FAVORITE_TRACKS}
      className={cn(styles.playlist_link, {
        [styles.playlist_link_active]: ROUTES.FAVORITE_TRACKS === pathname
      })}>
      <img
        className={styles.cover}
        width={48}
        height={48}
        src='/favorite-tracks-cover.png'
        alt='Favorite tracks cover'
      />
      <p className={styles.title}>Любимые треки</p>
      <div className={styles.info}>
        {/* {isFixed && <PiPushPinFill size='15px' fill='var(--color-primary)' />} */}
        Плейлист <UiDot isGray /> {countTracks} {getNameCount(countTracks)}
      </div>
    </Link>
  )
}
