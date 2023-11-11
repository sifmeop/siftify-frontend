import { TrackFavorite } from './track-favorite'
import { TrackNoFavorite } from './track-no-favorite'

interface Props {
  isHover: boolean
  favoriteId: string | undefined
  trackId: string
}

export const TrackFavoriteWrapper = ({
  isHover,
  favoriteId,
  trackId
}: Props) => {
  if (favoriteId) {
    return <TrackFavorite id={favoriteId} />
  }

  return (
    <div className='w-[25px] h-[25px]'>
      {isHover && <TrackNoFavorite trackId={trackId} />}
    </div>
  )
}
