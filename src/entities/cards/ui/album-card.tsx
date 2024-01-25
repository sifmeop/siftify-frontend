import { ITrack } from '#/shared/api'
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
  tracks: ITrack[]
}

function calculateTotalDuration(tracks: ITrack[]) {
  let totalMinutes = 0
  let totalSeconds = 0

  tracks.forEach((track) => {
    const [minutes, seconds] = track.duration.split(':')
    totalMinutes += parseInt(minutes, 10)
    totalSeconds += parseInt(seconds, 10)
  })

  totalMinutes += Math.floor(totalSeconds / 60)
  totalSeconds = totalSeconds % 60

  return `${totalMinutes} мин. ${totalSeconds} сек`
}

export const AlbumCard = ({
  title,
  cover,
  artistName,
  artistId,
  artistPhoto,
  createdAt,
  tracks
}: Props) => {
  const year = new Date(createdAt).getFullYear()
  const countTracks = tracks.length
  const duration = calculateTotalDuration(tracks)

  return (
    <div className={styles.container}>
      <div>
        <img className='w-[250px] h-[250px]' src={getUrl(cover)} alt={title} />
      </div>
      <div className={styles.left}>
        <span className='text-sm'>{countTracks > 1 ? 'АЛЬБОМ' : 'ТРЕК'}</span>
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
          <span>{countTracks} треков</span>
          <span className={styles.dot} />
          <span>{duration}</span>
        </div>
      </div>
    </div>
  )
}
