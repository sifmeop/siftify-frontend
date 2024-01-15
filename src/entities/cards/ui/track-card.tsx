import { ROUTES } from '#/shared/constants'
import { getUrl } from '#/shared/lib'
import { Link } from 'react-router-dom'
import styles from './card.module.scss'

interface Props {
  title: string
  cover: string
  artistName: string
  artistId: string
  artistPhoto: string | null
  createdAt: string
  trackDuration: string
}

export const TrackCard = ({
  title,
  cover,
  artistName,
  artistId,
  artistPhoto,
  createdAt,
  trackDuration
}: Props) => {
  const year = new Date(createdAt).getFullYear()
  const [minute, seconds] = trackDuration.split(':')
  const duration = `${Number(minute)} мин. ${seconds} сек.`

  return (
    <div className={styles.container}>
      <div>
        <img className='max-w-[250px]' src={getUrl(cover)} alt={title} />
      </div>
      <div>
        <span className='text-sm'>СИНГЛ</span>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.info}>
          <div className='flex items-center gap-1'>
            <img
              className='rounded-full w-7 h-7'
              width={28}
              height={28}
              src={artistPhoto ? getUrl(artistPhoto) : '/default-avatar.jpg'}
              alt={artistName}
            />
            <Link to={`${ROUTES.ARTIST}/${artistId}`} className='font-bold'>
              {artistName}
            </Link>
          </div>
          <span className={styles.dot} />
          <span>{year}</span>
          <span className={styles.dot} />
          <span>1 трек</span>
          <span className={styles.dot} />
          <span>{duration}</span>
        </div>
      </div>
    </div>
  )
}
