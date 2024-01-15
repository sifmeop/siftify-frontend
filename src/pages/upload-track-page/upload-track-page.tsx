import { useUploadTrack } from '#/entities/track/api/upload'
import { DropzoneTracks } from '#/features/dropzone-tracks'
import { ResponseError } from '#/shared/api/api'
import { useUploadTrackStore } from '#/shared/store'
import { UiButton } from '#/shared/ui/UiButton'
import { UiInput } from '#/shared/ui/UiInput'
import { UiDropzoneCover } from '#/shared/ui/ui-dropzone-cover'
import { UiLabel } from '#/shared/ui/ui-label'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Tab, Tabs } from '@mui/material'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const schema = yup.object({
  cover: yup
    .mixed()
    .test('isFile', 'Please provide a valid file', (value) => {
      return value instanceof File
    })
    .required('Обложка обязательна'),
  albumName: yup.string()
})

type FormData = yup.InferType<typeof schema>

export const UploadTrackPage = () => {
  const [value, setValue] = useState(0)
  const tracks = useUploadTrackStore((state) => state.tracks)
  const setTracks = useUploadTrackStore((state) => state.setTracks)

  const methods = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const { mutateAsync } = useUploadTrack()

  const onSubmit = async (data: FormData) => {
    console.log({ ...data, tracks }, 'data')

    if (!tracks.length) {
      toast.error('Нужно загрузить хотя бы один трек')
      return
    }

    if (tracks.length > 1 && value === 0) {
      setValue(0)
    }

    if (value === 1 && !data.albumName?.trim().length) {
      toast.error('Название альбома обязательно')
      return
    }

    const checkEmptyTitles = tracks.reduce(
      (acc, track) => (track.title === '' ? acc + 1 : acc),
      0
    )

    if (checkEmptyTitles === 1) {
      toast.error('Заполните название для трека')
      return
    } else if (checkEmptyTitles > 1) {
      toast.error('Заполните название для треков')
      return
    }

    const titles = new Set()
    for (const track of tracks) {
      if (titles.has(track.title)) {
        toast.error('Названия треков должны быть уникальными')
        return
      } else {
        titles.add(track.title)
      }
    }

    const formData = new FormData()

    const cover = data.cover as File
    const tracksFiles = tracks.map(({ track }) => track)
    const tracksData = tracks.map((data) => {
      const featuring = data.featuring.map((feat) => ({
        label: feat.label,
        value: feat.value,
        isNew: feat.__isNew__ ?? false
      }))
      const newData = {
        ...data,
        featuring: JSON.stringify(featuring),
        trackFileName: data.track.name
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      delete newData.id
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      delete newData.track
      return newData
    })

    if (value === 1) {
      formData.append('albumName', data.albumName!)
    }

    formData.append('cover', cover)

    for (let i = 0; i < tracksFiles.length; i++) {
      formData.append(`tracksFiles`, tracksFiles[i])
    }

    formData.append('tracksData', JSON.stringify(tracksData))

    try {
      await mutateAsync(formData).then(() => {
        if (value === 0) {
          toast.success('Трек успешно загружен')
        } else {
          toast.success('Треки успешно загружены')
        }
        methods.reset()
        setTracks([])
      })
    } catch (e: unknown) {
      console.log(e)
      const error = e as ResponseError

      const isMessage = typeof error?.response?.data?.message === 'string'

      toast.error(
        isMessage ? error?.response?.data?.message : 'Не удалось загрузить трек'
      )
    }
  }

  useEffect(() => {
    methods.setValue('albumName', '')
    if (tracks.length) {
      setTracks([])
    }
  }, [value])

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          variant='fullWidth'
          value={value}
          onChange={handleChange}
          aria-label='Тип трека'>
          <Tab label='Сингл' />
          <Tab label='EP/Альбом' />
        </Tabs>
      </Box>
      <FormProvider {...methods}>
        <form
          className='flex mx-auto max-w-3xl flex-col gap-2'
          onSubmit={methods.handleSubmit(onSubmit)}>
          <UiLabel htmlFor='cover'>Обложка</UiLabel>
          <UiDropzoneCover />
          {value === 1 && (
            <>
              <UiLabel htmlFor='cover'>Название альбома</UiLabel>
              <UiInput
                register={methods.register('albumName')}
                placeholder='Название альбома'
              />
            </>
          )}
          <DropzoneTracks single={value === 0 ? true : false} />
          <UiButton type='submit' disabled={!tracks.length}>
            Загрузить
          </UiButton>
        </form>
      </FormProvider>
    </>
  )
}
