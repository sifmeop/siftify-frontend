import { ROUTES } from '#/shared/constants'
import { useUser } from '#/shared/hooks'
import { getNameCount } from '#/shared/lib/getNameCountTracks'
import { Link } from 'react-router-dom'
import styles from './card.module.scss'

interface Props {
  countTracks: number
}

export const FavoriteTracksCard = ({ countTracks }: Props) => {
  const { id, username } = useUser()

  return (
    <div className={styles.container}>
      <div>
        <img
          className='w-[250px] h-[250px]'
          src='/favorite-tracks-cover.png'
          alt='Любимые треки'
        />
      </div>
      <div className={styles.left}>
        <span className='text-sm'>ПЛЕЙЛИСТ</span>
        <h1 className={styles.title}>Любимые треки</h1>
        <div className={styles.info}>
          <Link to={`${ROUTES.USER}/${id}`} className='font-bold'>
            {username}
          </Link>
          <span className={styles.dot} />
          <span>
            {countTracks} {getNameCount(countTracks)}
          </span>
        </div>
      </div>
    </div>
  )
}
