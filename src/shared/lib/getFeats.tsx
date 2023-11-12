import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { IFeaturing } from '../api/api'
import { ROUTES } from '../constants'

export const getFeats = (feats: IFeaturing[]) => {
  return feats.map(({ name, id }, index) => (
    <Fragment key={name}>
      <Link to={`${ROUTES.ARTIST}/${id}`} className='hover:underline'>
        {name}
      </Link>
      {feats.length !== index + 1 && ', '}
    </Fragment>
  ))
}
