import { BiTime } from 'react-icons/bi'
import styles from './ui-table-tracks.module.scss'

export const UiTableTracks = () => {
  return (
    <div className={styles.wrapper}>
      <div className='text-center'>#</div>
      <div>Название</div>
      <div>Альбом</div>
      <div>Дата добавления</div>
      <div />
      <div>
        <BiTime />
      </div>
    </div>
  )
}
