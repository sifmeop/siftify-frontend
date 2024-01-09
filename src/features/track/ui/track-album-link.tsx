import { getTrackUrl } from '#/shared/lib'
import { Link } from 'react-router-dom'

interface Props {
  id: string
  title: string
}

export const TrackAlbumLink = ({ title, id }: Props) => {
  return (
    <Link to={getTrackUrl(id)} className='w-fit hover:underline'>
      {title}
    </Link>
  )
}
