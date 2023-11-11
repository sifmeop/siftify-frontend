import { useRemoveTrackFromFavorites } from '#/entities/track/api/remove-track-from-favorites'
import { MdFavorite } from 'react-icons/md'

interface Props {
  id: string
}

export const TrackFavorite = ({ id }: Props) => {
  const { mutate } = useRemoveTrackFromFavorites()

  const handleAdd = async () => mutate(id)

  return (
    <button onClick={handleAdd}>
      <MdFavorite size='25' fill='var(--color-primary)' />
    </button>
  )
}
