import styles from './track.module.scss'

interface Props {
  duration: string
}

export const TrackDuration = ({ duration }: Props) => {
  return <p className={styles.duration}>{duration}</p>
}
