import styles from './Button.module.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const Button = ({ children }: Props) => {
  return <button className={styles.button}>{children}</button>
}
