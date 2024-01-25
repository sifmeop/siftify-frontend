import {
  useAddTrackPlaylist,
  useRemoveTrackPlaylist
} from '#/entities/playlists'
import { ITrack } from '#/shared/api'
import { toastBottom } from '#/shared/lib/toastBottom'
import { useQueueStore } from '#/shared/store'
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { IoMdAdd } from 'react-icons/io'
import { IoAddCircleOutline } from 'react-icons/io5'
import { LuListPlus } from 'react-icons/lu'

interface Props {
  rightClick?: boolean
  anchorEl?: HTMLElement | null
  onClose: () => void
  track: ITrack
  contextMenu?: {
    mouseX: number
    mouseY: number
  } | null
}

export const ContextMenu = ({
  rightClick = false,
  anchorEl = null,
  onClose,
  track,
  contextMenu = null
}: Props) => {
  const open = !!anchorEl

  const addToQueue = useQueueStore((state) => state.addTrackToQueue)
  const { mutateAsync: addTrackPlaylist } = useAddTrackPlaylist()
  const { mutateAsync: removeTrackPlaylist } = useRemoveTrackPlaylist()

  const handleAddTrack = async () => {
    onClose()

    if (track.playlistId) return

    try {
      await addTrackPlaylist({
        playlistId: track.playlistId ?? '65b26c0f9d9944b95f67d657',
        trackId: track.id
      })
    } catch (error) {
      console.log(`Error add track to playlist: ${track.playlistId}`, error)
    }
  }

  const handleRemoveTrack = async () => {
    onClose()

    if (!track.playlistId) return

    try {
      await removeTrackPlaylist({
        playlistId: track.playlistId ?? '65b26c0f9d9944b95f67d657',
        trackId: track.id
      })
    } catch (error) {
      console.log(
        `Error deleting track from playlist: ${track.playlistId}`,
        error
      )
    }
  }

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
      anchorReference={rightClick ? 'anchorPosition' : 'anchorEl'}
      MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}
      anchorOrigin={{
        vertical: rightClick ? 'top' : 'bottom',
        horizontal: rightClick ? 'left' : 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: rightClick ? 'left' : 'right'
      }}
      anchorPosition={
        contextMenu
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }>
      {track.playlistId ? (
        <MenuItem onClick={handleRemoveTrack}>
          <ListItemIcon>
            <IoMdAdd size='20px' fill='#ffffff' />
          </ListItemIcon>
          <ListItemText>Убрать из плейлиста</ListItemText>
        </MenuItem>
      ) : (
        <MenuItem onClick={handleAddTrack}>
          <ListItemIcon>
            <IoMdAdd size='20px' fill='#ffffff' />
          </ListItemIcon>
          <ListItemText>Добавить в плейлист</ListItemText>
        </MenuItem>
      )}
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <IoAddCircleOutline size='20px' stroke='#ffffff' />
        </ListItemIcon>
        <ListItemText>Добавить в любимые треки</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => {
          addToQueue(track)
          onClose()
          toastBottom('Трек добавлен в очередь')
        }}>
        <ListItemIcon>
          <LuListPlus size='20px' stroke='#ffffff' />
        </ListItemIcon>
        <ListItemText>Добавить в очередь</ListItemText>
      </MenuItem>
    </Menu>
  )
}
