import { useGetArtist } from '#/entities/artist/api/get-artist'
import { ArtistCard } from '#/entities/cards'
import { useParams } from 'react-router-dom'

export const ArtistPageWrapper = () => {
  const { id } = useParams()

  if (!id) {
    return <h1 className='text-center text-lg'>ID is undefined</h1>
  }

  return <ArtistPage id={id} />
}

const ArtistPage = ({ id }: { id: string }) => {
  const { data, isLoading, isError, error } = useGetArtist(id)

  if (isLoading) {
    return 'Loading...'
  }

  if (isError) {
    return 'Error'
  }

  if (!data) {
    return <h1 className='text-center text-lg'>Artist undefined</h1>
  }

  return (
    <div>
      <ArtistCard
        name={data.name}
        photo={data.artistPhoto}
        listening={data.listening}
      />
    </div>
  )
}
