import { AlbumCard } from '#/entities/cards'
import { useGetAlbumById } from '#/entities/track'
import { TrackTableList } from '#/entities/trackTableList'
import { useParams } from 'react-router-dom'

export const AlbumPageWrapper = () => {
  const { id } = useParams()

  if (!id) {
    return <h1 className='text-center text-lg'>ID не найден</h1>
  }

  return <AlbumPage id={id} />
}

const AlbumPage = ({ id }: { id: string }) => {
  const { data, isLoading, isError, error, isSuccess } = useGetAlbumById(id)

  return (
    <div>
      {data && (
        <AlbumCard
          title={data.title}
          cover={data.cover}
          artistName={data.artist.name}
          artistId={data.artistId}
          artistPhoto={data.artist.artistPhoto}
          createdAt={data.createdAt}
          tracks={data.tracks}
        />
      )}
      <TrackTableList
        isTrackPage
        tracks={data?.tracks}
        isLoading={isLoading}
        isError={isError}
        error={error}
        isSuccess={isSuccess}
      />
    </div>
  )
}
