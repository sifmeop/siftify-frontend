import { Track as ITrack } from '#/shared/api'
import { useAudioPlayerStore } from '#/shared/store'
import styles from './track.module.scss'

interface TrackWrapperProps {
  children: React.ReactNode
  data: ITrack
  setIsHover: React.Dispatch<React.SetStateAction<boolean>>
}

export const TrackWrapper = ({
  children,
  data,
  setIsHover
}: TrackWrapperProps) => {
  const setCurrentTrack = useAudioPlayerStore((state) => state.setCurrentTrack)

  const onMouseEnter = () => {
    setIsHover(true)
  }

  const onMouseLeave = () => {
    setIsHover(false)
  }

  const handleDoubleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.detail === 2) setCurrentTrack(data)
  }

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      // onDoubleClick={handleDoubleClick}
    >
      {children}
    </div>
  )
}
