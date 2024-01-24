interface Props {
  date: string
}

const formatDate = (dateString: string): string => {
  const now = new Date().getTime()
  const date = new Date(dateString).getTime()
  const diff = (now - date) / 1000

  const minutes = Math.floor(diff / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  const rtf = new Intl.RelativeTimeFormat('ru', {
    numeric: 'always',
    style: 'long',
    localeMatcher: 'best fit'
  })

  if (years > 0) {
    return rtf.format(0 - years, 'year')
  } else if (months > 0) {
    return rtf.format(0 - months, 'month')
  } else if (days > 0) {
    return rtf.format(0 - days, 'day')
  } else if (hours > 0) {
    return rtf.format(0 - hours, 'hour')
  } else {
    return rtf.format(0 - minutes, 'minute')
  }
}

export const TrackAddedDate = ({ date }: Props) => {
  return <span className='w-fit text-sm'>{formatDate(date)}</span>
}
