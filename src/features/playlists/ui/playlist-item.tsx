import { ContextMenu, useContextMenu } from '#/entities/context-menu'
import { useDeletePlaylist, usePinPlaylist } from '#/entities/playlists'
import { EditPlaylist } from '#/features/edit-playlist'
import { IPlaylist } from '#/shared/api/api'
import { ROUTES } from '#/shared/constants'
import { useUser } from '#/shared/hooks'
import { cn } from '#/shared/lib'
import { UiDot } from '#/shared/ui/ui-dot'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { FiMinusCircle } from 'react-icons/fi'
import { LuMusic } from 'react-icons/lu'
import { MdOutlineEdit } from 'react-icons/md'
import { PiPushPin, PiPushPinFill } from 'react-icons/pi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useBoolean } from 'usehooks-ts'
import styles from './playlist.module.scss'

type Props = IPlaylist

export const PlaylistItem = ({ id, title, isFixed, description }: Props) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { username } = useUser()
  const { contextMenu, handleClose, handleContextMenu } = useContextMenu()
  const { value, setTrue, setFalse } = useBoolean()

  const { mutateAsync: deletePlaylist } = useDeletePlaylist()
  const { mutateAsync: pinPlaylist } = usePinPlaylist()

  const handleDelete = async (id: string) => {
    handleClose()
    try {
      await deletePlaylist(id).then(() => {
        if (`/playlist/${id}` === pathname) {
          navigate(ROUTES.HOME)
        }
      })
    } catch (error) {
      console.log(`Error deleting playlist: ${id}`, error)
    }
  }

  const handlePin = async (id: string) => {
    handleClose()
    try {
      await pinPlaylist({ playlistId: id, isFixed: !isFixed })
    } catch (error) {
      console.log(`Error deleting playlist: ${id}`, error)
    }
  }

  return (
    <>
      <Link
        key={id}
        to={`${ROUTES.PLAYLIST}/${id}`}
        className={cn(styles.playlist_link, {
          [styles.playlist_link_active]: `/playlist/${id}` === pathname
        })}
        onContextMenu={handleContextMenu}
        onClick={(e) => {
          e.preventDefault()
          if (contextMenu) return
          navigate(`${ROUTES.PLAYLIST}/${id}`)
        }}>
        <div className={styles.cover}>
          <LuMusic size='24px' color='#b3b3b3' />
        </div>
        <p className={styles.title}>{title}</p>
        <div className={styles.info}>
          {isFixed && <PiPushPinFill size='15px' fill='var(--color-primary)' />}
          Плейлист <UiDot isGray /> {username}
        </div>
        <ContextMenu contextMenu={contextMenu} onClose={handleClose}>
          <MenuItem onClick={() => handlePin(id)}>
            <ListItemIcon>
              {isFixed ? (
                <PiPushPinFill size='20px' fill='var(--color-primary)' />
              ) : (
                <PiPushPin size='20px' color='#ffffff' />
              )}
            </ListItemIcon>
            <ListItemText>{isFixed ? 'Открепить' : 'Закрепить'}</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose()
              setTrue()
            }}>
            <ListItemIcon>
              <MdOutlineEdit size='20px' color='#ffffff' />
            </ListItemIcon>
            <ListItemText>Изменить сведения</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleDelete(id)}>
            <ListItemIcon>
              <FiMinusCircle size='20px' color='#ffffff' />
            </ListItemIcon>
            <ListItemText>Удалить</ListItemText>
          </MenuItem>
        </ContextMenu>
      </Link>
      <EditPlaylist
        isOpen={value}
        onClose={setFalse}
        id={id}
        title={title}
        description={description}
      />
    </>
  )
}
