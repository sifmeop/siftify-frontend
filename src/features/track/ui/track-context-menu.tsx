import { ContextMenu } from '#/features/context-menu'
import { ITrack } from '#/shared/api'
import { cn } from '#/shared/lib'
import { useMediaQuery } from '@mui/material'
import { useState } from 'react'
import { GoKebabHorizontal } from 'react-icons/go'

interface Props {
  isHover: boolean
  track: ITrack
}

export const TrackContextMenu = ({ track, isHover }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const isTablet = useMediaQuery('(max-width: 768px)')

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <button
        className={cn('block w-fit', {
          hidden: !isHover && !isTablet
        })}
        onClick={handleOpen}>
        <GoKebabHorizontal size='20px' />
      </button>
      <ContextMenu anchorEl={anchorEl} onClose={handleClose} track={track} />
    </>
  )
}
