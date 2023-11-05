import { BASE_URL, Track as ITrack } from '#/shared/api'
import { formatDate, getFeats } from '#/shared/lib'
import { useState } from 'react'
import { TrackFavoriteWrapper } from './track-favorite-wrapper'
import TrackPlayButton from './track-play-button'
import { TrackWrapper } from './track-wrapper'
import styles from './track.module.scss'

interface TrackProps {
  data: ITrack
  trackIndex: number
}

export const Track = ({ data, trackIndex }: TrackProps) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <TrackWrapper data={data} setIsHover={setIsHover}>
      <TrackPlayButton data={data} trackIndex={trackIndex} isHover={isHover} />
      <div className={styles.titleBlock}>
        <img
          width={70}
          height={70}
          src={`${BASE_URL}${data.poster}`}
          alt={data.title}
        />
        <div>
          <h2 className='mb-1'>{data.title}</h2>
          <div className='text-sm text-white/80'>
            {getFeats(data.featuring)}
          </div>
        </div>
      </div>
      <div>{data.title}</div>
      <div>{formatDate(data.added_at)}</div>
      <TrackFavoriteWrapper
        isHover={isHover}
        favorite={data.favoriteBy}
        trackId={data.id}
      />
      <div>{data.duration}</div>
    </TrackWrapper>
  )
}