export const formatDate = (dateString: string): string => {
  const now = new Date().getTime()
  const date = new Date(dateString).getTime()
  const diff = now - date

  const rtf = new Intl.RelativeTimeFormat('en', {
    numeric: 'always',
    style: 'long',
    localeMatcher: 'best fit'
  })

  if (diff < 0) {
    return rtf.format(-Math.floor(diff / (24 * 60 * 60 * 1000)), 'day')
  } else if (diff < 60 * 1000) {
    return rtf.format(-Math.floor(diff / 1000), 'second')
  } else if (diff < 60 * 60 * 1000) {
    return rtf.format(-Math.floor(diff / (60 * 1000)), 'minute')
  } else if (diff < 24 * 60 * 60 * 1000) {
    return rtf.format(-Math.floor(diff / (60 * 60 * 1000)), 'hour')
  } else if (diff < 7 * 24 * 60 * 60 * 1000) {
    return rtf.format(-Math.floor(diff / (24 * 60 * 60 * 1000)), 'day')
  } else if (diff < 30 * 24 * 60 * 60 * 1000) {
    return rtf.format(-Math.floor(diff / (7 * 24 * 60 * 60 * 1000)), 'week')
  } else if (diff < 365 * 24 * 60 * 60 * 1000) {
    return rtf.format(-Math.floor(diff / (30 * 24 * 60 * 60 * 1000)), 'month')
  } else {
    return rtf.format(-Math.floor(diff / (365 * 24 * 60 * 60 * 1000)), 'year')
  }
}
