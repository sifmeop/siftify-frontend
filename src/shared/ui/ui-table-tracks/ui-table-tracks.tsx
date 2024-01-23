import { cn } from '#/shared/lib'
import { BiTime } from 'react-icons/bi'
import styles from './ui-table-tracks.module.scss'

interface Props {
  isTrackPage?: boolean
}

export const UiTableTracks = ({ isTrackPage = false }: Props) => {
  return (
    <div
      className={cn(styles.wrapper, {
        [styles.isTrackPage]: isTrackPage
      })}>
      <div className='text-center'>#</div>
      <div>Название</div>
      {!isTrackPage && (
        <>
          <div>Альбом</div>
          <div>Дата добавления</div>
        </>
      )}
      <div />
      <div>
        <BiTime />
      </div>
    </div>
  )
}
