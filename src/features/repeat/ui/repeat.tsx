import { RepeatType, useRepeatStore } from '#/shared/store/repeat'
import { MdRepeat, MdRepeatOne } from 'react-icons/md'

export const Repeat = () => {
  const { repeat, setRepeat } = useRepeatStore()

  const handleRepeat = (value: RepeatType) => {
    switch (value) {
      case 'none':
        setRepeat('none')
        break
      case 'all':
        setRepeat('all')
        break
      case 'one':
        setRepeat('one')
    }
  }

  const getRepeatIcon = () => {
    switch (repeat) {
      case 'none':
        return (
          <button onClick={() => handleRepeat('all')}>
            <MdRepeat size='25px' />
          </button>
        )
      case 'all':
        return (
          <button onClick={() => handleRepeat('one')}>
            <MdRepeat fill='var(--color-primary)' size='25px' />
          </button>
        )
      case 'one':
        return (
          <button onClick={() => handleRepeat('none')}>
            <MdRepeatOne fill='var(--color-primary)' size='25px' />
          </button>
        )
    }
  }

  return getRepeatIcon()
}
