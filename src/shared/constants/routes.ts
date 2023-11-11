export type RoutesType = (typeof ROUTES)[keyof typeof ROUTES]

export const ROUTES = {
  HOME: '/',
  SIGN_UP: '/auth/sign-up',
  SIGN_IN: '/auth/sign-in',
  SEARCH: '/search',
  ARTIST: '/artist'
}
