import { Menu } from '@mui/material'

interface Props {
  contextMenu?: {
    mouseX: number
    mouseY: number
  } | null
  onClose: () => void
  children: React.ReactNode
  leftClick?: boolean
  anchorEl?: HTMLElement | null
}

export const ContextMenu = ({
  anchorEl = null,
  leftClick = false,
  contextMenu = null,
  onClose,
  children
}: Props) => {
  const open = !!anchorEl

  return (
    <Menu
      sx={{
        '& .MuiMenu-paper': {
          bgcolor: 'transparent'
        },
        '& .MuiList-root': {
          color: '#ffffff',
          bgcolor: '#282828',
          borderRadius: '8px'
        }
      }}
      anchorEl={anchorEl}
      open={!!contextMenu || open}
      onClose={onClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}
      anchorOrigin={{
        vertical: leftClick ? 'bottom' : 'top',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      anchorReference={leftClick ? 'anchorEl' : 'anchorPosition'}
      anchorPosition={
        contextMenu
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }>
      {children}
    </Menu>
  )
}
