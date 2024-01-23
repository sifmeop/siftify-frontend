import { cn } from '../lib'

interface Props {
  isGray?: boolean
}

export const UiDot = ({ isGray = false }: Props) => {
  return (
    <div
      className={cn('w-1 h-1 rounded-full', {
        'bg-white': !isGray,
        'bg-[var(--gray)]': isGray
      })}
    />
  )
}
