import { ContextMenu } from '#/features/context-menu'
import { ITrack } from '#/shared/api'
import { cn } from '#/shared/lib'
import { useRef, useState } from 'react'
import styles from './track.module.scss'

interface ChildrenParams {
  isHover: boolean
}

interface Props {
  children: ({ isHover }: ChildrenParams) => JSX.Element
  isMinimized?: boolean
  track: ITrack
}

export const TrackWrapper = ({
  children,
  track,
  isMinimized = false
}: Props) => {
  const [isHover, setIsHover] = useState(false)
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number
    mouseY: number
  } | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  const onMouseEnter = () => {
    setIsHover(true)
  }

  const onMouseLeave = () => {
    setIsHover(false)
  }

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6
          }
        : null
    )
  }

  const handleClose = () => {
    setContextMenu(null)
  }

  return (
    <div
      ref={trackRef}
      role='row'
      className={cn(styles.wrapper, {
        [styles.wrapper_minimized]: isMinimized
      })}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onContextMenu={handleContextMenu}>
      {children({ isHover })}
      <ContextMenu
        rightClick
        track={track}
        contextMenu={contextMenu}
        onClose={handleClose}
      />
    </div>
  )
}
