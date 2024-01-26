import { useState } from 'react'

export const useContextMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpenAnchor = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseAnchor = () => {
    setAnchorEl(null)
  }

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number
    mouseY: number
  } | null>(null)

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

  return {
    contextMenu,
    handleContextMenu,
    handleClose,
    anchorEl,
    handleOpenAnchor,
    handleCloseAnchor
  }
}
