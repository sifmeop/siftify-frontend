import { Track as ITrack } from '#/shared/api'
import { getTrackUrl } from '#/shared/lib'
import { Link } from 'react-router-dom'

type Props = ITrack

export const TrackAlbumLink = ({ title, id }: Props) => {
  return (
    <Link to={getTrackUrl(id)} className='hover:underline'>
      {title}
    </Link>
  )
}
