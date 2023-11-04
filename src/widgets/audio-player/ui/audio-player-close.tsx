import { useAudioPlayerStore } from '#/shared/store'
import { AiOutlineClose } from 'react-icons/ai'

export const AudioPlayerClose = () => {
  const closePlayer = useAudioPlayerStore().closePlayer

  return (
    <button className='absolute top-2 right-2' onClick={closePlayer}>
      <AiOutlineClose size={30} fill='black' />
    </button>
  )
}
