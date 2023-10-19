import { CircularProgress } from '@mui/material'
import clsx from 'clsx'
import styles from './UiButton.module.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  loader?: boolean
}

export const UiButton = ({
  children,
  className,
  loader = false,
  ...props
}: Props) => {
  return (
    <button
      className={clsx(styles.button, className, {
        'grid place-items-center': loader
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
