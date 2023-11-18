import { useGetArtist } from '#/entities/artist/api/get-artist'
import { useParams } from 'react-router-dom'

export const ArtistPageWrapper = () => {
  const { id } = useParams()

  if (!id) {
    return <h1 className='text-center text-lg'>ID is undefined</h1>
  }

  return <ArtistPage id={id} />
}

const ArtistPage = ({ id }: { id: string }) => {
  const { data } = useGetArtist(id)

  if (!data) {
    return <h1 className='text-center text-lg'>Artist undefined</h1>
  }

  return <div>{data.name}</div>
}
