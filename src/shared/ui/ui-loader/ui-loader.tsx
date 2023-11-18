import { CircularProgress } from '@mui/material'

interface Props {
  isLoading?: boolean
}

export const UiLoader = ({ isLoading = true }: Props) => {
  if (!isLoading) return null

  return (
    <div className='text-center my-2'>
      <CircularProgress
        sx={{
          color: () => 'var(--color-primary)'
        }}
      />
    </div>
  )
}
