import { FavoriteToggle } from '#/features/favorite-toggle'
import { getFeats, getUrl } from '#/shared/lib'
import { useAudioPlayerStore } from '#/shared/store'

export const AudioPlayerInfo = () => {
  const currentTrack = useAudioPlayerStore((state) => state.currentTrack!)

  return (
    <div className='flex items-center gap-4'>
      <img
        width={50}
        height={50}
        src={getUrl(currentTrack.cover)}
        alt={currentTrack.title}
      />
      <div>
        <p>{currentTrack.title}</p>
        <p>{getFeats(currentTrack.featuring)}</p>
      </div>
      <FavoriteToggle
        isHover
        favoriteTrackId={currentTrack.favoriteBy?.trackId}
        trackId={currentTrack.id}
      />
    </div>
  )
}
