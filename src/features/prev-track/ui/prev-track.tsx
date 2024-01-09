import { useQueueStore } from '#/shared/store'
import { IoMdSkipBackward } from 'react-icons/io'

export const PrevTrack = () => {
  const prevTrack = useQueueStore((state) => state.prevTrack)

  return (
    <button onClick={prevTrack}>
      <IoMdSkipBackward size='25px' />
    </button>
  )
}
