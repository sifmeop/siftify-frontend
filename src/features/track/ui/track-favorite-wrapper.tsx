import { TrackFavoriteType } from '#/shared/api/api'
import { TrackFavorite } from './track-favorite'
import { TrackNoFavorite } from './track-no-favorite'

interface Props {
  isHover: boolean
  favorite: TrackFavoriteType
  trackId: string
}

export const TrackFavoriteWrapper = ({ isHover, favorite, trackId }: Props) => {
  if (favorite) {
    return <TrackFavorite id={favorite.id} />
  }

  return (
    <div className='w-[25px] h-[25px]'>
      {isHover && <TrackNoFavorite trackId={trackId} />}
    </div>
  )
}
