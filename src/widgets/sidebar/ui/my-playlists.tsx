import { CreatePlaylist, Playlists } from '#/features/playlists'
import styles from './sidebar.module.scss'

export const MyPlaylists = () => {
  return (
    <div className={styles.media_library}>
      <CreatePlaylist />
      <Playlists />
    </div>
  )
}
