import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { MdFavoriteBorder } from 'react-icons/md'
import { toast } from 'react-toastify'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: UseMutateAsyncFunction<any, unknown, string, unknown>
  isLoadingQuery: boolean
  trackId: string
}

export const UiAddToFavorite = ({ query, isLoadingQuery, trackId }: Props) => {
  const handleAdd = async () => {
    if (isLoadingQuery) {
      toast.error('Трек добавляется в любимые...')
      return
    }

    try {
      await query(trackId)
    } catch (error) {
      toast.error('Не удалось добавить трек в любимые')
    }
  }

  return (
    <button className='opacity-70 hover:opacity-100' onClick={handleAdd}>
      <MdFavoriteBorder size='25' />
    </button>
  )
}
