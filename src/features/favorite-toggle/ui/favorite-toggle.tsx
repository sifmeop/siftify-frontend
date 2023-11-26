import { UiAddToFavorite } from './ui-add-to-favorite'
import { UiRemoveFromFavorite } from './ui-remove-from-favorite'

interface Props {
  isHover?: boolean
  favoriteTrackId?: string
  trackId: string
}

export const FavoriteToggle = ({
  isHover = true,
  favoriteTrackId,
  trackId
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
