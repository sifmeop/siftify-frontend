import styles from './main.module.scss'

interface Props {
  children: React.ReactNode
}

export const Main = ({ children }: Props) => {
  return <main className={styles.main}>{children}</main>
}
