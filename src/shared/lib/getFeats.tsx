import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export const getFeats = (feats: string[]) => {
  return feats.map((artist, index) => (
    <Fragment key={artist}>
      <Link to={artist} target='_blank' className='hover:underline'>
        {artist}
      </Link>
      {feats.length !== index + 1 && ', '}
    </Fragment>
  ))
}
