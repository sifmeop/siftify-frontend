import { FavoriteToggle } from '#/features/favorite-toggle'
import { ITrack } from '#/shared/api'
import { TrackAddedDate } from './track-added-date'
import TrackPlayButton from './track-play-button'
import { TrackWrapper } from './track-wrapper'
import { TrackAlbumLink } from './trackAlbumLink'
import { TrackTitleBox } from './trackTitleBox'

interface TrackProps {
  data: ITrack
  trackIndex: number
}

export const Track = ({ data, trackIndex }: TrackProps) => {
  const favoriteTrackId = data.favoriteBy?.trackId

  return (
    <TrackWrapper>
      {({ isHover }) => (
        <>
          <TrackPlayButton
            data={data}
            trackIndex={trackIndex}
            isHover={isHover}
          />
          <TrackTitleBox {...data} />
          <TrackAlbumLink {...data} />
          <TrackAddedDate date={data.added_at} />
          <FavoriteToggle
            isHover={isHover}
            favoriteTrackId={favoriteTrackId}
            trackId={data.id}
          />
          <div>{data.duration}</div>
        </>
      )}
    </TrackWrapper>
  )
}
