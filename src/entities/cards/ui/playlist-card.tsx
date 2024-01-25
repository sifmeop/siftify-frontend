import { ROUTES } from '#/shared/constants'
import { getNameCount } from '#/shared/lib/getNameCountTracks'
import { Link } from 'react-router-dom'
import styles from './card.module.scss'
import { getUrl } from '#/shared/lib'
import { LuMusic } from 'react-icons/lu'

interface Props {
  title: string
  cover?: string
  username: string
  userId: string
  countTracks: number
}

export const PlaylistCard = ({
  title,
  cover,
  username,
  userId,
  countTracks
}: Props) => {
  return (
    <div className={styles.container}>
      <div>
        {cover ? (
          <img
            className='w-[250px] h-[250px]'
            src={getUrl(cover)}
            alt='Любимые треки'
          />
        ) : (
          <div className={styles.cover}>
            <LuMusic size='100px' color='#b3b3b3' />
          </div>
        )}
      </div>
      <div className={styles.left}>
        <span className='text-sm'>ПЛЕЙЛИСТ</span>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.info}>
          <Link to={`${ROUTES.USER}/${userId}`} className='font-bold'>
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
