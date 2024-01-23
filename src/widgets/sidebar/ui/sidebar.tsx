import { Navigation } from './main-links'
import { MyPlaylists } from './my-playlists'
import styles from './sidebar.module.scss'

export const Sidebar = () => {
  return (
    <aside className={styles.aside}>
      <Navigation />
      <MyPlaylists />
    </aside>
  )
}
