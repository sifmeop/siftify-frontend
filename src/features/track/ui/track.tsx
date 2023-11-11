import { Track as ITrack } from '#/shared/api'
import { useState } from 'react'
import { TrackAddedDate } from './track-added-date'
import { TrackFavoriteWrapper } from './track-favorite-wrapper'
import TrackPlayButton from './track-play-button'
import { TrackWrapper } from './track-wrapper'

import { TrackAlbumLink } from './trackAlbumLink'
import { TrackTitleBox } from './trackTitleBox'

interface TrackProps {
  data: ITrack
  trackIndex: number
}

export const Track = ({ data, trackIndex }: TrackProps) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <TrackWrapper data={data} setIsHover={setIsHover}>
      <TrackPlayButton data={data} trackIndex={trackIndex} isHover={isHover} />
      <TrackTitleBox {...data} />
      <TrackAlbumLink {...data} />
      <TrackAddedDate date={data.added_at} />
      <TrackFavoriteWrapper
        isHover={isHover}
        favoriteId={data.favoriteBy?.id}
        trackId={data.id}
      />
      <div>{data.duration}</div>
    </TrackWrapper>
  )
}
