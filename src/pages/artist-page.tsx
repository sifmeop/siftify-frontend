import { useGetArtist } from '#/entities/artist/api/get-artist'
import { useParams } from 'react-router-dom'

export const ArtistPageWrapper = () => {
  const { id } = useParams()

  console.log(id, 'id')

  if (!id) {
    return <h1 className='text-center text-lg'>ID is undefined</h1>
  }

  return <ArtistPage id={id} />
}

const ArtistPage = ({ id }: { id: string }) => {
  const { data } = useGetArtist(id)

  console.log(data, 'data')

  return <div>{id}</div>
}
