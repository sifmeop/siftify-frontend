export const setItemToLocalStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    console.log('Local storage error', error)
  }
}

export const getItemFromLocalStorage = (key: string) => {
  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.log('Local storage error', error)
  }
}

export const removeItemFromLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.log('Local storage error', error)
  }
}
