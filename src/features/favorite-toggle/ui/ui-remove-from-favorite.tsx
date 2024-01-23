import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { MdFavorite } from 'react-icons/md'
import { toast } from 'react-toastify'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: UseMutateAsyncFunction<any, unknown, string, unknown>
  isLoadingQuery: boolean
  trackId: string
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>
}

export const UiRemoveFromFavorite = ({
  query,
  isLoadingQuery,
  trackId,
  setIsFavorite
}: Props) => {
  const handleRemove = async () => {
    if (isLoadingQuery) {
      toast.error('Трек удаляется из любимых...')
      return
    }

    setIsFavorite(false)

    try {
      await query(trackId)
    } catch (error) {
      setIsFavorite(true)
    }
  }

  return (
    <button onClick={handleRemove}>
      <MdFavorite size='25' color='var(--color-primary)' />
    </button>
  )
}
