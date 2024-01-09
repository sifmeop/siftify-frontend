import { ROUTES } from '#/shared/constants'
import { usePageRedirectOnMismatch } from '#/shared/hooks'
import { cn } from '#/shared/lib'
import { PiListFill } from 'react-icons/pi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './queue.module.scss'

export const Queue = () => {
  const { pathname } = useLocation()
  const { handleNavigate } = usePageRedirectOnMismatch()
  const navigate = useNavigate()

  const isCurrentQueue = pathname === ROUTES.QUEUE

  const fill = isCurrentQueue ? 'var(--color-primary)' : 'var(--white)'

  return (
    <Link
      to={ROUTES.QUEUE}
      onClick={(e) => {
        e.preventDefault()
        if (isCurrentQueue) {
          navigate(-1)
        } else {
          handleNavigate(e)
        }
      }}
      className={cn(styles.queue, {
        [styles.queue_active]: isCurrentQueue
      })}>
      <PiListFill size='25px' fill={fill} />
    </Link>
  )
}
