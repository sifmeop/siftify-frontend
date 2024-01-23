import { useCreatePlaylist } from '#/entities/playlists'
import { ROUTES } from '#/shared/constants'
import { cn } from '#/shared/lib'
import { IconButton } from '@mui/material'
import { HiPlus } from 'react-icons/hi'
import { LuLibrary } from 'react-icons/lu'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from './playlist.module.scss'

export const CreatePlaylist = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { mutateAsync, isLoading } = useCreatePlaylist()

  const handleClick = async () => {
    if (isLoading) {
      toast.error('Плейлист создается...')
      return
    }

    try {
      await mutateAsync().then((res) => {
        navigate(`${ROUTES.PLAYLIST}/${res.id}`)
      })
    } catch (error) {
      console.log('Не удалось создать медиатеку', error)
    }
  }

  return (
    <div className='flex items-center gap-2 justify-between'>
      <Link
        className={cn(styles.link, {
          [styles.link_active]: pathname === ROUTES.PLAYLIST
        })}
        to={ROUTES.PLAYLIST}>
        <LuLibrary size='30px' />
        Моя медиатека
      </Link>
      <IconButton
        aria-label='create media library'
        color='primary'
        onClick={handleClick}>
        <HiPlus size='25px' fill='#ffffff' />
      </IconButton>
    </div>
  )
}
