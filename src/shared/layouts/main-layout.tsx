import { AudioPlayer } from '#/widgets/audio-player'
import { Header } from '#/widgets/header/ui'
import { Main } from '#/widgets/main'
import { Sidebar } from '#/widgets/sidebar'
import { Outlet } from 'react-router-dom'
import styles from './main-layout.module.scss'

export const MainLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <Header />
      <Main>
        <Outlet />
      </Main>
      <AudioPlayer />
    </div>
  )
}
