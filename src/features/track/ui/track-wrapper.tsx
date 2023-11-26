import { useState } from 'react'
import styles from './track.module.scss'

interface Props {
  children: ({ isHover }: { isHover: boolean }) => JSX.Element
}

export const TrackWrapper = ({ children }: Props) => {
  const [isHover, setIsHover] = useState(false)

  const onMouseEnter = () => {
    setIsHover(true)
  }

  const onMouseLeave = () => {
    setIsHover(false)
  }

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {children({ isHover })}
    </div>
  )
}
