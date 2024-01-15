import { TrackAlbumLink } from '#/entities/track'
import { FavoriteToggle } from '#/features/favorite-toggle'
import { ITrack } from '#/shared/api'
import { TrackAddedDate } from './track-added-date'
import { TrackContextMenu } from './track-context-menu'
import { TrackDuration } from './track-duration'
import TrackPlayButton from './track-play-button'
import { TrackWrapper } from './track-wrapper'
import { TrackTitleBox } from './trackTitleBox'

interface TrackProps {
  data: ITrack
  trackList?: ITrack[]
  trackIndex?: number
  isMinimized?: boolean
  fromQueue?: boolean
  fromUserQueue?: boolean
  tableQueueListId?: string
}

export const Track = ({
  data,
  trackList,
  trackIndex = 1,
  isMinimized = false,
  fromQueue = false,
  fromUserQueue = false,
  tableQueueListId
}: TrackProps) => {
  const favoriteTrackId = data.favoriteBy?.trackId

  return (
    <TrackWrapper track={data} isMinimized={isMinimized}>
      {({ isHover }) => (
        <>
          <TrackPlayButton
            tableQueueListId={tableQueueListId}
            fromQueue={fromQueue}
            fromUserQueue={fromUserQueue}
            trackList={trackList}
            data={data}
            trackIndex={trackIndex}
            isHover={isHover}
          />
          <TrackTitleBox
            {...data}
            fromQueue={fromQueue}
            fromUserQueue={fromUserQueue}
          />
          <TrackAlbumLink id={data.album.id} title={data.album.title} />
          {!isMinimized && <TrackAddedDate date={data.uploadedAt} />}
          <FavoriteToggle
            isHover={isHover}
            favoriteTrackId={favoriteTrackId}
            trackId={data.id}
          />
          <TrackDuration duration={data.duration} />
          <TrackContextMenu track={data} isHover={isHover} />
        </>
      )}
    </TrackWrapper>
  )
}
