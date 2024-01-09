import { useGetAllTracks } from '#/entities/track'
import { TrackTableList } from '#/entities/trackTableList'

export const HomePage = () => {
  const data = useGetAllTracks()

  return <TrackTableList {...data} />
}
