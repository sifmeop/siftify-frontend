import { siftifyApi } from '#/shared/api'
import { QUERY_KEYS } from '#/shared/constants'
import { useMutation } from '@tanstack/react-query'

export const useUploadTrack = () => {
  return useMutation({
    mutationKey: QUERY_KEYS.UPLOAD,
    mutationFn: (body: any) => siftifyApi.uploadTrack(body)
  })
}
