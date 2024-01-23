import { useGetPlaylists } from '#/entities/playlists'
import { UiLoader } from '#/shared/ui/ui-loader'
import { FavoriteTracks } from './favorite-tracks'
import { PlaylistItem } from './playlist-item'

export const Playlists = () => {
  const { data, isSuccess, isLoading } = useGetPlaylists()

  return (
    <div className='mt-2'>
      <FavoriteTracks />
      <UiLoader isLoading={isLoading} />
      {isSuccess &&
        data?.map((playlist) => (
          <PlaylistItem key={playlist.id} {...playlist} />
        ))}
    </div>
  )
}
