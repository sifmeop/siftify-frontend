import { AudioPlayer } from '#/widgets/audio-player'
import { Sidebar } from '#/widgets/navigation'
import { Outlet } from 'react-router-dom'
import styles from './main-layout.module.scss'

export const MainLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.main}>
        <Outlet />
      </div>
      <AudioPlayer />
    </div>
  )
}
