import { siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useQuery } from '@tanstack/react-query'

export const useSearch = (value: string) => {
  return useQuery(QUERY_KEYS.SEARCH(value), () => siftifyApi.search(value), {
    enabled: value.length > 0
  })
}
