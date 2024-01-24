import { useUserStore } from '#/shared/store'
import { useMemo } from 'react'
import { useAddTrackToFavorites } from '../model/use-add-to-favorite'
import { useRemoveFromFavorites } from '../model/use-remove-from-favorite'
import { UiAddToFavorite } from './ui-add-to-favorite'
import { UiRemoveFromFavorite } from './ui-remove-from-favorite'

interface Props {
  trackId: string
  isHover: boolean
}

export const FavoriteToggle = ({ trackId, isHover }: Props) => {
  const favoriteTracksIds = useUserStore((state) => state.favoriteTracksIds)

  const isFavoriteTrack = useMemo(
    () => favoriteTracksIds.includes(trackId),
    [favoriteTracksIds]
  )

  const { mutateAsync: mutateAsyncAdd, isLoading: isLoadingAdd } =
    useAddTrackToFavorites()
  const { mutateAsync: mutateAsyncRemove, isLoading: isLoadingRemove } =
    useRemoveFromFavorites()

  if (isFavoriteTrack) {
    return (
      <UiRemoveFromFavorite
        query={mutateAsyncRemove}
        isLoadingQuery={isLoadingAdd || isLoadingRemove}
        trackId={trackId}
      />
    )
  }

  return (
    <div className='w-[25px] h-[25px]'>
      {isHover && (
        <UiAddToFavorite
          query={mutateAsyncAdd}
          isLoadingQuery={isLoadingAdd || isLoadingRemove}
          trackId={trackId}
        />
      )}
    </div>
  )
}
