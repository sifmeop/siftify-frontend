import { UiAddToFavorite } from './ui-add-to-favorite'
import { UiRemoveFromFavorite } from './ui-remove-from-favorite'

interface Props {
  favoriteTrackId?: string
  trackId: string
  isHover: boolean
}

export const FavoriteToggle = ({
  favoriteTrackId,
  trackId,
  isHover
}: Props) => {
  if (favoriteTrackId) {
    return <UiRemoveFromFavorite trackId={favoriteTrackId} />
  }

  return (
    <div className='w-[25px] h-[25px]'>
      {isHover && <UiAddToFavorite trackId={trackId} />}
    </div>
  )
}
