import { Track } from '#/shared/api'
import { cn, getFeats, getUrl } from '#/shared/lib'
import { useAudioPlayerStore } from '#/shared/store'
import styles from './track.module.scss'

type Props = Track

export const TrackTitleBox = ({ cover, title, featuring }: Props) => {
  const currentTrackTitle = useAudioPlayerStore(
    (state) => state.currentTrack?.title
  )

  return (
    <div className={styles.titleBlock}>
      <img width={70} height={70} src={getUrl(cover)} alt={title} />
      <div>
        <h2
          className={cn('mb-1 text-white', {
            'text-primary': currentTrackTitle === title
          })}>
          {title}
        </h2>
        <h3 className='text-sm'>{getFeats(featuring)}</h3>
      </div>
    </div>
  )
}
