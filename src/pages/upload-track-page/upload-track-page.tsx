import { useUploadTrack } from '#/entities/track/api/upload'
import { DropzoneTracks } from '#/features/dropzone-tracks'
import { ResponseError } from '#/shared/api/api'
import { useUploadTrackStore } from '#/shared/store'
import { UiButton } from '#/shared/ui/UiButton'
import { UiInput } from '#/shared/ui/UiInput'
import { UiDropzoneCover } from '#/shared/ui/ui-dropzone-cover'
import { UiLabel } from '#/shared/ui/ui-label'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, SxProps, Tab, Tabs } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Id, toast } from 'react-toastify'
import * as yup from 'yup'

const tabsStyle: SxProps = {
  mb: 2,
  '.MuiTab-root': {
    color: '#CDD2DB',
    borderBottom: '2px solid #272829',
    fontWeight: 'bold',
    fontFamily: 'var(--font-family)',
    '&.Mui-selected': {
      color: 'var(--color-primary)'
    }
  },
  '.MuiTabs-indicator': {
    bgcolor: 'var(--color-primary)'
  }
}

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
  const toastId = useRef<Id | null>(null)

  const methods = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const { mutateAsync, isLoading, isSuccess, isError } = useUploadTrack()

  useEffect(() => {
    if (isLoading) {
      toastId.current = toast.loading(
        value === 0 ? 'Загрузка трека' : 'Загрузка альбома'
      )
    }

    if ((isSuccess || isError) && toastId.current) {
      toast.dismiss(toastId.current)
      toastId.current = null
    }
  }, [isLoading, isSuccess, isError])

  useEffect(() => {
    return () => {
      setTracks([])
      methods.reset()
    }
  }, [])

  const onSubmit = async (data: FormData) => {
    if (!tracks.length) {
      toast.error('Нужно загрузить хотя бы один трек')
      return
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
      const newData: {
        featuring: string
        trackFileName: string
        id?: string
        title: string
        track?: File
      } = {
        ...data,
        featuring: JSON.stringify(featuring),
        trackFileName: data.track.name
      }
      delete newData.id
      delete newData.track
      return newData
    })

    if (tracks.length > 1) {
      formData.append('albumName', data.albumName!)
    }

    formData.append('cover', cover)

    for (let i = 0; i < tracksFiles.length; i++) {
      formData.append(`tracksFiles`, tracksFiles[i])
    }

    formData.append('tracksData', JSON.stringify(tracksData))

    const isTrack = value === 0

    try {
      await mutateAsync(formData).then(() => {
        toast.success(`${isTrack ? 'Трек' : 'Альбом'} загружен`)
        setTracks([])
        methods.reset()
      })
    } catch (e: unknown) {
      console.log(e)
      const error = e as ResponseError

      const isMessage = typeof error?.response?.data?.message === 'string'

      toast.error(
        isMessage
          ? error?.response?.data?.message
          : `Не удалось загрузить ${isTrack ? 'трек' : 'альбома'}`
      )
    }
  }

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          sx={tabsStyle}
          variant='fullWidth'
          value={value}
          onChange={handleChange}
          aria-label='Тип трека'>
          <Tab label='Сингл' />
          <Tab label='Альбом' />
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
          <UiButton
            type='submit'
            loader={isLoading}
            disabled={!tracks.length || isLoading}>
            Загрузить
          </UiButton>
        </form>
      </FormProvider>
    </>
  )
}
