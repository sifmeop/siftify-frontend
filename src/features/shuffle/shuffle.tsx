import { useQueueStore } from '#/shared/store'
import { useState } from 'react'
import { IoMdShuffle } from 'react-icons/io'

export const Shuffle = () => {
  const [isShuffled, setIsShuffled] = useState(false)

  const shuffleQueue = useQueueStore((state) => state.shuffleQueue)
  const unShuffleQueue = useQueueStore((state) => state.unShuffleQueue)

  const handleShuffle = () => {
    const value = !isShuffled
    setIsShuffled(value)
    if (value) {
      shuffleQueue()
    } else {
      unShuffleQueue()
    }
  }

  const fill = isShuffled ? 'var(--color-primary)' : '#ffffff'

  return (
    <button onClick={handleShuffle}>
      <IoMdShuffle size='25px' fill={fill} />
    </button>
  )
}
