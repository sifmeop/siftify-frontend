import { Track as ITrack } from '#/shared/api'
import { Link } from 'react-router-dom'

type Props = ITrack

export const TrackAlbumLink = ({ title }: Props) => {
  return (
    <Link to={title} className='hover:underline'>
      {title}
    </Link>
  )
}
