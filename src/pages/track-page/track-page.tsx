import { TrackCard } from '#/entities/cards'
import { useGetTrack } from '#/entities/track/api/get-track'
import { useParams } from 'react-router-dom'

export const TrackPageWrapper = () => {
  const { id } = useParams()

  if (!id) {
    return <h1 className='text-center text-lg'>ID is undefined</h1>
  }

  return <TrackPage id={id} />
}

const TrackPage = ({ id }: { id: string }) => {
  const { data } = useGetTrack(id)

  if (!data) {
    return <h1 className='text-center text-lg'>Track undefined</h1>
  }

  return (
    <div>
      <TrackCard
        title={data.title}
        cover={data.cover}
        artistName={data.artist.name}
        artistId={data.artistId}
        artistPhoto={data.artist.artistPhoto}
        createdAt={data.uploadedAt}
        trackDuration={data.duration}
      />
    </div>
  )
}
