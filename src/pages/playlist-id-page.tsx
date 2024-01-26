import { PlaylistCard } from '#/entities/cards'
import { useGetPlaylistById } from '#/entities/playlists'
import { TrackTableList } from '#/entities/trackTableList'
import { PlaylistContextMenu } from '#/features/playlists/ui/playlist-context-menu'
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
        description={data.description}
      />
      <PlaylistContextMenu
        id={data.id}
        title={data.title}
        cover={data.cover}
        description={data.description}
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
