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
  trackIndex: number
  isMinimized?: boolean
  tableQueueListId?: string
  fromQueue?: boolean
  fromUserQueue?: boolean
  isTrackPage?: boolean
}

export const Track = ({
  data,
  trackList,
  trackIndex,
  isMinimized = false,
  fromUserQueue = false,
  isTrackPage = false,
  fromQueue,
  tableQueueListId
}: TrackProps) => {
  return (
    <TrackWrapper
      track={data}
      isMinimized={isMinimized}
      isTrackPage={isTrackPage}>
      {({ isHover }) => (
        <>
          <TrackPlayButton
            fromQueue={fromQueue}
            fromUserQueue={fromUserQueue}
            tableQueueListId={tableQueueListId}
            trackList={trackList}
            data={data}
            trackIndex={trackIndex}
            isHover={isHover}
          />
          <TrackTitleBox {...data} fromQueue={fromQueue || fromUserQueue} />
          {!isTrackPage && (
            <TrackAlbumLink id={data.album.id} title={data.album.title} />
          )}
          {/* {!isMinimized && <TrackAddedDate date={data.uploadedAt} />} */}
          {!(isMinimized || isTrackPage) && (
            <TrackAddedDate date={data.addedAt} />
          )}
          <FavoriteToggle
            trackIsFavorite={data.trackIsFavorite}
            isHover={isHover}
            trackId={data.id}
          />
          <TrackDuration duration={data.duration} />
          <TrackContextMenu track={data} isHover={isHover} />
        </>
      )}
    </TrackWrapper>
  )
}
