export const QUERY_KEYS = {
  GET_ALL_TRACKS: ['get-all-tracks'],
  ADD_TRACK_TO_FAVORITES: ['add-track-to-favorites'],
  REMOVE_TRACK_FROM_FAVORITES: ['remove-track-from-favorites'],
  GET_ARTIST: (artistId: string) => ['get-artist', artistId],
  GET_ARTISTS: ['get-artists'],
  GET_TRACK: ['get-track'],
  LISTENING_TRACK: ['listening-track'],
  UPLOAD: ['upload'],
  SEARCH: (value: string) => ['search', value],
  LOGOUT: ['logout'],
  ALBUM: (id: string) => ['album', id],
  CREATE_PLAYLIST: ['create-playlist'],
  GET_PLAYLISTS: ['get-playlists'],
  GET_PLAYLISTS_BY_ID: (id: string) => ['get-playlist', id],
  DELETE_PLAYLIST: ['delete-playlist'],
  PIN_PLAYLIST: ['pin-playlist']
}
