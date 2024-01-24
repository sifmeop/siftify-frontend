import { FavoriteToggle } from '#/features/favorite-toggle'
import { getFeats, getUrl } from '#/shared/lib'
import { useAudioPlayerStore } from '#/shared/store'
import { Link } from 'react-router-dom'

export const AudioPlayerInfo = () => {
  const playingTrack = useAudioPlayerStore((state) => state.playingTrack!)

  return (
    <div className='flex items-center gap-4'>
      <img
        width={50}
        height={50}
        src={getUrl(playingTrack.cover)}
        alt={playingTrack.title}
      />
      <div>
        <Link
          to={`/album/${playingTrack.album.id}`}
          className='hover:underline'>
          {playingTrack.title}
        </Link>
        <p>{getFeats(playingTrack.featuring)}</p>
      </div>
      <FavoriteToggle isHover trackId={playingTrack.id} />
    </div>
  )
}
