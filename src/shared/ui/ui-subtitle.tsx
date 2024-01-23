import { cn } from '../lib'

interface Props {
  children: string
  isCentered?: boolean
  className?: string
}

export const UiSubtitle = ({
  children,
  isCentered = false,
  className
}: Props) => {
  return (
    <h2
      className={cn('text-[#6a6a6a] font-semibold text-base mb-2', className, {
        'text-center': isCentered
      })}>
      {children}
    </h2>
  )
}
