import { MdFavorite } from 'react-icons/md'
import { toast } from 'react-toastify'
import { useRemoveFromFavorites } from '../model/use-remove-from-favorite'

interface Props {
  trackId: string
}

export const UiRemoveFromFavorite = ({ trackId }: Props) => {
  const { mutateAsync, isLoading } = useRemoveFromFavorites()

  const handleRemove = async () => {
    if (isLoading) {
      toast.error('Removing track from favorites...')
      return
    }

    await mutateAsync({ trackId })
  }

  return (
    <button onClick={handleRemove}>
      <MdFavorite size='25' color='var(--color-primary)' />
    </button>
  )
}
