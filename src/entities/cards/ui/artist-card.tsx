import { getUrl } from '#/shared/lib'
import styles from './card.module.scss'

interface Props {
  name: string
  photo: string | null
  listening: number
}

export const ArtistCard = ({ name, photo, listening }: Props) => {
  return (
    <div className={styles.container}>
      <div>
        <img
          className='max-w-[250px]'
          src={photo ? getUrl(photo) : '/default-avatar.jpg'}
          alt={name}
        />
      </div>
      <div>
        <span className='text-sm'>АРТИСТ</span>
        <h1 className={styles.title}>{name}</h1>
        <div className='text-sm'>{listening} прослушиваний за месяц</div>
      </div>
    </div>
  )
}
