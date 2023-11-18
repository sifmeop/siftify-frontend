import { useAddTrackToFavorites } from '#/entities/track/api/add-track-to-favorites'
import { useUserStore } from '#/shared/store'
import { MdFavoriteBorder } from 'react-icons/md'
import { toast } from 'react-toastify'

interface Props {
  trackId: string
}

export const TrackNoFavorite = ({ trackId }: Props) => {
  const { user } = useUserStore()
  const { mutateAsync } = useAddTrackToFavorites()

  const handleRemove = async () => {
    if (!user) {
      toast.error('Нужна авторизация')
      return
    }

    await mutateAsync({ trackId })
  }

  return (
    <button onClick={handleRemove}>
      <MdFavoriteBorder size='25' />
    </button>
  )
}
