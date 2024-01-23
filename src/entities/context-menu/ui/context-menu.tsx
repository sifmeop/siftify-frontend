import { Menu } from '@mui/material'

interface Props {
  contextMenu: {
    mouseX: number
    mouseY: number
  } | null
  onClose: () => void
  children: React.ReactNode
}

export const ContextMenu = ({ contextMenu, onClose, children }: Props) => {
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
      open={contextMenu !== null}
      onClose={onClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}
      anchorReference='anchorPosition'
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }>
      {children}
    </Menu>
  )
}
