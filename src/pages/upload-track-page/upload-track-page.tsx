import { SelectArtists } from '#/entities/select-artists'
import { useUploadTrack } from '#/entities/track/api/upload'
import { DropzoneTracks } from '#/features/dropzone-tracks'
import { ResponseError } from '#/shared/api/api'
import { useUser } from '#/shared/hooks'
import { UiButton } from '#/shared/ui/UiButton'
import { UiInput } from '#/shared/ui/UiInput'
import { UiDropzone } from '#/shared/ui/ui-dropzone'
import { UiLabel } from '#/shared/ui/ui-label'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const schema = yup.object({
  cover: yup
    .mixed()
    .test('isFile', 'Please provide a valid file', (value) => {
      return value instanceof File
    })
    .required('Cover is required'),
  title: yup.string().required('Title is required'),
  featuring: yup.array().of(
    yup.object({
      label: yup.string(),
      value: yup.string(),
      isFixed: yup.boolean()
    })
  ),
  tracks: yup
    .mixed()
    .test('isFile', 'Please provide a valid file', (value) => {
      return value instanceof File && Array.isArray(value)
    })
    .required('Track is required')
})

type FormData = yup.InferType<typeof schema>

export const UploadTrackPage = () => {
  const user = useUser()

  const methods = useForm<FormData>({
    defaultValues: {
      featuring: [
        {
          value: user.artist!.id,
          label: user.artist!.name,
          isFixed: true
        }
      ],
      tracks: []
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const { mutateAsync } = useUploadTrack()

  const onSubmit = async (data: FormData) => {
    console.log(data, 'data')

    const formData = new FormData()

    const cover = data.cover as File
    const tracks = data.tracks as File
    const featuring = data.featuring?.map(({ label }) => label)

    formData.append('cover', cover)
    formData.append('tracks', tracks)
    formData.append('trackTitle', data.title)
    formData.append('featuring', JSON.stringify(featuring))

    try {
      await mutateAsync(formData).then(() => {
        toast.success('Track uploaded')
        methods.reset()
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

  return (
    <FormProvider {...methods}>
      <form
        className='flex flex-col gap-2'
        onSubmit={methods.handleSubmit(onSubmit)}>
        <UiLabel htmlFor='cover'>Обложка</UiLabel>
        <UiDropzone id='cover' name='cover' acceptFiles='image' />
        <UiLabel htmlFor='name'>Название трека</UiLabel>
        <UiInput
          id='name'
          register={methods.register('title')}
          placeholder='Название трека'
        />
        <UiLabel htmlFor='featuring'>Фиты</UiLabel>
        <SelectArtists id='featuring' />
        <DropzoneTracks />
        <UiButton type='submit'>Загрузить</UiButton>
      </form>
    </FormProvider>
  )
}
