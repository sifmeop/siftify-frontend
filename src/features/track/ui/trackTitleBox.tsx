import { ITrack } from '#/shared/api'
import { cn, getFeats, getUrl } from '#/shared/lib'
import { useAudioPlayerStore } from '#/shared/store'
import styles from './track.module.scss'

type Props = ITrack & {
  fromQueue?: boolean
}

export const TrackTitleBox = ({
  cover,
  title,
  featuring,
  id,
  fromQueue
}: Props) => {
  const playingTrack = useAudioPlayerStore((state) => state.playingTrack)

  return (
    <div className={styles.titleBlock}>
      <img width={50} height={50} src={getUrl(cover)} alt={title} />
      <div>
        <h2
          className={cn(styles.track_name, {
            'text-primary': id === playingTrack?.id && !fromQueue
          })}>
          {title}
        </h2>
        <h3 className='text-sm'>{getFeats(featuring)}</h3>
      </div>
    </div>
  )
}
