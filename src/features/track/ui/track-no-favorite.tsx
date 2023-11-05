import { useAddTrackToFavorites } from '#/entities/track/api/add-track-to-favorites'
import { MdFavoriteBorder } from 'react-icons/md'

interface Props {
  trackId: string
}

export const TrackNoFavorite = ({ trackId }: Props) => {
  // const userId = useUserStore((state) => state.user!.id)
  const { mutate } = useAddTrackToFavorites()

  const handleRemove = async () => mutate({ trackId })

  return (
    <button onClick={handleRemove}>
      <MdFavoriteBorder size='25' />
    </button>
  )
}
