import { Track as ITrack } from '#/shared/api'
import { useAudioPlayerStore } from '#/shared/store'
import { useState } from 'react'
import TrackPlayButton from './track-play-button'
import styles from './track.module.scss'

interface TrackWrapperProps {
  children: React.ReactNode
  data: ITrack
  trackIndex: number
}

export const TrackWrapper = ({
  children,
  data,
  trackIndex
}: TrackWrapperProps) => {
  const { setCurrentTrack } = useAudioPlayerStore()
  const [isHover, setIsHover] = useState(false)

  const onMouseEnter = () => {
    setIsHover(true)
  }

  const onMouseLeave = () => {
    setIsHover(false)
  }

  const handleDoubleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e.detail === 2) setCurrentTrack(data)
  }

  return (
    <button
      className={styles.wrapper}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleDoubleClick}>
      <TrackPlayButton data={data} trackIndex={trackIndex} isHover={isHover} />
      {children}
    </button>
  )
}
