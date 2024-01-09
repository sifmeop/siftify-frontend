import { cn } from '../lib'

interface Props {
  children: string
  isCentered?: boolean
}

export const UiSubtitle = ({ children, isCentered = false }: Props) => {
  return (
    <h2
      className={cn('text-[#6a6a6a] font-semibold text-base mb-2', {
        'text-center': isCentered
      })}>
      {children}
    </h2>
  )
}
