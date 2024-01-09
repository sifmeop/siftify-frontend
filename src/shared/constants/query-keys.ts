export const QUERY_KEYS = {
  GET_ALL_TRACKS: ['get-all-tracks'],
  ADD_TRACK_TO_FAVORITES: ['add-track-to-favorites'],
  REMOVE_TRACK_FROM_FAVORITES: ['remove-track-from-favorites'],
  GET_ARTIST: ['get-artist'],
  GET_ARTISTS: ['get-artists'],
  GET_TRACK: ['get-track'],
  LISTENING_TRACK: ['listening-track'],
  UPLOAD: ['upload'],
  SEARCH: (value: string) => ['search', value],
  LOGOUT: ['logout']
}
