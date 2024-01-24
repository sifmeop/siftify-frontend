export const getNameCount = (count: number) => {
  if (count === 1) {
    return 'трек'
  } else if (count > 1 && count < 5) {
    return 'трека'
  } else {
    return 'треков'
  }
}
