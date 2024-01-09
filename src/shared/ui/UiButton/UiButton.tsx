import { CircularProgress } from '@mui/material'
import clsx from 'clsx'
import styles from './UiButton.module.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  loader?: boolean
  variant?: 'primary' | 'outlined'
}

export const UiButton = ({
  children,
  className,
  loader = false,
  variant = 'primary',
  ...props
}: Props) => {
  return (
    <button
      className={clsx(styles.button, className, {
        'grid place-items-center': loader,
        [styles.primary]: variant === 'primary',
        [styles.outlined]: variant === 'outlined'
      })}
      {...props}>
      {children}
      {loader && (
        <CircularProgress
          sx={{
            width: '30px',
            height: '30px',
            position: 'absolute',
            zIndex: 1
          }}
        />
      )}
    </button>
  )
}
