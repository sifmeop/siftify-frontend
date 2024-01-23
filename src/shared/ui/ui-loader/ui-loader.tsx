import { cn } from '#/shared/lib'
import { CircularProgress } from '@mui/material'

interface Props {
  isLoading?: boolean
  className?: string
}

export const UiLoader = ({ isLoading = true, className }: Props) => {
  if (!isLoading) return null

  return (
    <div className={cn('text-center my-2', className)}>
      <CircularProgress
        sx={{
          color: () => 'var(--color-primary)'
        }}
      />
    </div>
  )
}
