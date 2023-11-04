export const formatDate = (dateString: string): string => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInMilliseconds = now.getTime() - date.getTime()
  const diffInSeconds = diffInMilliseconds / 1000
  const diffInMinutes = diffInSeconds / 60
  const diffInHours = diffInMinutes / 60
  const diffInDays = diffInHours / 24
  const diffInWeeks = diffInDays / 7

  if (diffInWeeks >= 4) {
    const months = [
      'Января',
      'Февраля',
      'Марта',
      'Апреля',
      'Мая',
      'Июня',
      'Июля',
      'Августа',
      'Сентября',
      'Октября',
      'Ноября',
      'Декабря'
    ]
    const month = months[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
  } else if (diffInDays >= 7) {
    const weeks = Math.floor(diffInWeeks)
    return `${weeks} недель назад`
  } else if (diffInDays >= 1) {
    const days = Math.floor(diffInDays)
    return `${days} ${getDeclension(days, ['день', 'дня', 'дней'])} назад`
  } else if (diffInHours >= 1) {
    const hours = Math.floor(diffInHours)
    return `${hours} ${getDeclension(hours, ['час', 'часа', 'часов'])} назад`
  } else if (diffInMinutes >= 1) {
    const minutes = Math.floor(diffInMinutes)
    return `${minutes} ${getDeclension(minutes, [
      'минута',
      'минуты',
      'минут'
    ])} назад`
  } else if (diffInSeconds >= 1) {
    const seconds = Math.floor(diffInSeconds)
    return `${seconds} ${getDeclension(seconds, [
      'секунда',
      'секунды',
      'секунд'
    ])} назад`
  } else {
    return 'только что'
  }
}

export const getDeclension = (
  number: number,
  titles: [string, string, string]
): string => {
  const cases = [2, 0, 1, 1, 1, 2]
  return titles[
    number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)]
  ]
}
