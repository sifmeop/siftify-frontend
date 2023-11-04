import { Link } from 'react-router-dom'

export const getFeats = (feats: string[]) => {
  return feats.map((artist, index) => (
    <Link key={artist} to={artist} target='_blank'>
      {artist}
      {feats.length !== index + 1 && ', '}
    </Link>
  ))
}
