import { ISearch } from '#/shared/api/api'
import { Box } from '@mui/material'
import { UseQueryResult } from '@tanstack/react-query'
import { SearchBestResult } from './search-best-result'
import { SearchTracks } from './search-tracks'
import styles from './search.module.scss'

interface Props {
  response: UseQueryResult<ISearch | undefined>
}

export const SearchList = ({ response }: Props) => {
  const data = response.data

  if (!data) {
    return null
  }

  return (
    <Box className={styles.wrapper}>
      <SearchBestResult data={data} />
      <SearchTracks tracks={data.tracks} />
    </Box>
  )
}
