import { formatDate } from '#/shared/lib'
import { memo } from 'react'

interface Props {
  date: string
}

export const TrackAddedDate = memo(({ date }: Props) => {
  return <div>{formatDate(date)}</div>
})

TrackAddedDate.displayName = 'TrackAddedDate'
