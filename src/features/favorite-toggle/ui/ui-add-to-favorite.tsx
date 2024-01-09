import { useUserStore } from '#/shared/store'
import { MdFavoriteBorder } from 'react-icons/md'
import { toast } from 'react-toastify'
import { useAddTrackToFavorites } from '../model/use-add-to-favorite'

interface Props {
  trackId: string
}

export const UiAddToFavorite = ({ trackId }: Props) => {
  const { user } = useUserStore()
  const { mutateAsync, isLoading } = useAddTrackToFavorites()

  const handleAdd = async () => {
    if (!user) {
      toast.error('Нужна авторизация')
      return
    }

    if (isLoading) {
      toast.error('Adding track to favorites...')
      return
    }

    await mutateAsync({ trackId })
  }

  return (
    <button className='opacity-70 hover:opacity-100' onClick={handleAdd}>
      <MdFavoriteBorder size='25' />
    </button>
  )
}
