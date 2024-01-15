import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getArtistUrl } from '.'
import { IFeaturing } from '../api/api'

export const getFeats = (feats: IFeaturing[]) => {
  return feats.map(({ name, artistId }, index) => (
    <Fragment key={name}>
      <Link to={getArtistUrl(artistId)} className='hover:underline'>
        {name}
      </Link>
      {feats.length !== index + 1 && ', '}
    </Fragment>
  ))
}
