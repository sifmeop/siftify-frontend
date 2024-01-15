import { getAlbumUrl } from '#/shared/lib/getUrl'
import { Link } from 'react-router-dom'

interface Props {
  id: string
  title: string
}

export const TrackAlbumLink = ({ id, title }: Props) => {
  return (
    <Link to={getAlbumUrl(id)} className='w-fit hover:underline'>
      {title}
    </Link>
  )
}
