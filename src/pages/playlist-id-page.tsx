import { useGetPlaylistById } from '#/entities/playlists'
import { useParams } from 'react-router-dom'

export const PlaylistIdPage = () => {
  const { id } = useParams()
  const { data } = useGetPlaylistById(id)

  return <div>{data?.title}</div>
}
