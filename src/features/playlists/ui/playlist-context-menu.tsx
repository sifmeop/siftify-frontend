import { ContextMenu, useContextMenu } from '#/entities/context-menu'
import { EditPlaylist } from '#/features/edit-playlist'
import { IEditPlaylist } from '#/shared/api/api'
import { IconButton, ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { BsThreeDots } from 'react-icons/bs'
import { MdOutlineEdit } from 'react-icons/md'
import { useBoolean } from 'usehooks-ts'

type Props = IEditPlaylist

export const PlaylistContextMenu = (props: Props) => {
  const { anchorEl, handleOpenAnchor, handleCloseAnchor } = useContextMenu()

  const { value, setFalse, setTrue } = useBoolean()

  return (
    <>
      <IconButton onClick={handleOpenAnchor}>
        <BsThreeDots size='20px' color='#ffffff' />
      </IconButton>
      <ContextMenu leftClick anchorEl={anchorEl} onClose={handleCloseAnchor}>
        <MenuItem
          onClick={() => {
            handleCloseAnchor()
            setTrue()
          }}>
          <ListItemIcon>
            <MdOutlineEdit size='20px' color='#ffffff' />
          </ListItemIcon>
          <ListItemText>Изменить сведения</ListItemText>
        </MenuItem>
      </ContextMenu>
      <EditPlaylist isOpen={value} onClose={setFalse} {...props} />
    </>
  )
}
