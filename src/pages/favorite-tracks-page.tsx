import { FavoriteTracksCard } from '#/entities/cards'
import { useGetFavoriteTracks } from '#/entities/track'
import { TrackTableList } from '#/entities/trackTableList'

export const FavoriteTracksPage = () => {
  const tracks = useGetFavoriteTracks()

  return (
    <>
      <FavoriteTracksCard countTracks={tracks.data?.length ?? 0} />
      <TrackTableList
        tracks={tracks.data}
        isLoading={tracks.isLoading}
        isError={tracks.isError}
        error={tracks.error}
        isSuccess={tracks.isSuccess}
      />
    </>
  )
}
