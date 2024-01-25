import { ContextMenu, useContextMenu } from '#/entities/context-menu'
import { usePinPlaylist } from '#/entities/playlists'
import { useGetFavoriteTracks } from '#/entities/track'
import { ROUTES } from '#/shared/constants'
import { cn } from '#/shared/lib'
import { getNameCount } from '#/shared/lib/getNameCountTracks'
import { UiDot } from '#/shared/ui/ui-dot'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { PiPushPin, PiPushPinFill } from 'react-icons/pi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './playlist.module.scss'

interface Props {
  id: string
  isFixed: boolean
}

export const FavoriteTracks = ({ id, isFixed }: Props) => {
  const { pathname } = useLocation()
  const { data } = useGetFavoriteTracks()
  const countTracks = data?.length ?? 0
  const { contextMenu, handleClose, handleContextMenu } = useContextMenu()
  const { mutateAsync: pinPlaylist } = usePinPlaylist()
  const navigate = useNavigate()

  const handlePin = async (id: string) => {
    handleClose()
    try {
      await pinPlaylist({ playlistId: id, isFixed: !isFixed })
    } catch (error) {
      console.log(`Error deleting playlist: ${id}`, error)
    }
  }

  return (
    <Link
      to={ROUTES.FAVORITE_TRACKS}
      className={cn(styles.playlist_link, {
        [styles.playlist_link_active]: ROUTES.FAVORITE_TRACKS === pathname
      })}
      onContextMenu={handleContextMenu}
      onClick={(e) => {
        e.preventDefault()
        if (contextMenu) return
        navigate(ROUTES.FAVORITE_TRACKS)
      }}>
      <img
        className={styles.cover}
        width={48}
        height={48}
        src='/favorite-tracks-cover.png'
        alt='Favorite tracks cover'
      />
      <p className={styles.title}>Любимые треки</p>
      <div className={styles.info}>
        {isFixed && <PiPushPinFill size='15px' fill='var(--color-primary)' />}
        Плейлист <UiDot isGray /> {countTracks} {getNameCount(countTracks)}
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
      </ContextMenu>
    </Link>
  )
}
