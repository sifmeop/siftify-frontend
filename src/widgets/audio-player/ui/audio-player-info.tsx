import { getFeats, getUrl } from '#/shared/lib'
import { useAudioPlayerStore } from '#/shared/store'

export const AudioPlayerInfo = () => {
  const currentTrack = useAudioPlayerStore((state) => state.currentTrack!)

  return (
    <div className='flex items-center gap-2'>
      <img
        width={80}
        height={80}
        src={getUrl(currentTrack.cover)}
        alt={currentTrack.title}
      />
      <div>
        <p>{currentTrack.title}</p>
        <p>{getFeats(currentTrack.featuring)}</p>
      </div>
    </div>
  )
}
