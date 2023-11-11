import { BiTime } from 'react-icons/bi'
import styles from './ui-table-tracks.module.scss'

export const UiTableTracks = () => {
  return (
    <div className={styles.wrapper}>
      <div className='text-center'>#</div>
      <div>Title</div>
      <div>Album</div>
      <div>Date added</div>
      <div />
      <div>
        <BiTime />
      </div>
    </div>
  )
}
