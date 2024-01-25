import { PlaylistCard } from '#/entities/cards'
import { useGetPlaylistById } from '#/entities/playlists'
import { TrackTableList } from '#/entities/trackTableList'
import { useParams } from 'react-router-dom'

export const PlaylistIdPage = () => {
  const { id } = useParams()
  const { data, isLoading, isError, error, isSuccess } = useGetPlaylistById(id)

  if (!data) {
    return
  }

  return (
    <div>
      <PlaylistCard
        countTracks={data.tracks.length}
        title={data?.title ?? ''}
        userId={data.userId}
        username={data.user.username}
        cover={data.cover}
      />
      <TrackTableList
        tracks={data?.tracks}
        isLoading={isLoading}
        isError={isError}
        error={error}
        isSuccess={isSuccess}
      />
    </div>
  )
}
