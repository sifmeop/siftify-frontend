import { Navigation } from './main-links'
import styles from './sidebar.module.scss'

export const Sidebar = () => {
  return (
    <aside className={styles.aside}>
      <Navigation />
    </aside>
  )
}
