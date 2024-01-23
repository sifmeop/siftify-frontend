import { useState } from 'react'
import { useAddTrackToFavorites } from '../model/use-add-to-favorite'
import { useRemoveFromFavorites } from '../model/use-remove-from-favorite'
import { UiAddToFavorite } from './ui-add-to-favorite'
import { UiRemoveFromFavorite } from './ui-remove-from-favorite'

interface Props {
  trackId: string
  isHover: boolean
  trackIsFavorite: boolean
}

export const FavoriteToggle = ({
  trackId,
  isHover,
  trackIsFavorite
}: Props) => {
  const [isFavorite, setIsFavorite] = useState(trackIsFavorite)

  const { mutateAsync: mutateAsyncAdd, isLoading: isLoadingAdd } =
    useAddTrackToFavorites()
  const { mutateAsync: mutateAsyncRemove, isLoading: isLoadingRemove } =
    useRemoveFromFavorites()

  if (isFavorite) {
    return (
      <UiRemoveFromFavorite
        query={mutateAsyncRemove}
        isLoadingQuery={isLoadingAdd || isLoadingRemove}
        trackId={trackId}
        setIsFavorite={setIsFavorite}
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
          setIsFavorite={setIsFavorite}
        />
      )}
    </div>
  )
}
