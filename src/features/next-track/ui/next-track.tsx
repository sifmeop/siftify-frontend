import { useQueueStore } from '#/shared/store'
import { IoMdSkipForward } from 'react-icons/io'

export const NextTrack = () => {
  const nextTrack = useQueueStore((state) => state.nextTrack)

  return (
    <button onClick={() => nextTrack()}>
      <IoMdSkipForward size='25px' />
    </button>
  )
}
