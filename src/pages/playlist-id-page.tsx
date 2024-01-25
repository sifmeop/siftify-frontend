import { PlaylistCard } from '#/entities/cards'
import { useGetPlaylistById } from '#/entities/playlists'
import { useParams } from 'react-router-dom'

export const PlaylistIdPage = () => {
  const { id } = useParams()
  const { data } = useGetPlaylistById(id)

  return (
    <div>
      <PlaylistCard
        countTracks={0}
        title={data?.title ?? ''}
        userId='asdasd'
        username='asdasd'
        cover={undefined}
      />
    </div>
  )
}
