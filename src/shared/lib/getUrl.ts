import { BASE_URL } from '../api'
import { ROUTES } from '../constants'

export const getUrl = (url: string) => `${BASE_URL}${url}`

export const getArtistUrl = (id: string) => `${ROUTES.ARTIST}/${id}`

export const getTrackUrl = (id: string) => `${ROUTES.TRACK}/${id}`
