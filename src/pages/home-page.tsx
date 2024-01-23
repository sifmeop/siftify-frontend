import { useGetAllTracks } from '#/entities/track'
import { TrackTableList } from '#/entities/trackTableList'

export const HomePage = () => {
  const data = useGetAllTracks()

  return (
    <TrackTableList
      tracks={data.data}
      isLoading={data.isLoading}
      isError={data.isError}
      error={data.error}
      isSuccess={data.isSuccess}
    />
  )
}
