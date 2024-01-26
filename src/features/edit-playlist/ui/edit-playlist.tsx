import { useEditPlaylist } from '#/entities/playlists'
import { IEditPlaylist } from '#/shared/api/api'
import { UiButton } from '#/shared/ui/UiButton'
import { UiInput } from '#/shared/ui/UiInput'
import { UiModal } from '#/shared/ui/ui-modal'
import { useForm } from 'react-hook-form'
import { LuMusic } from 'react-icons/lu'
import { toast } from 'react-toastify'
import styles from './edit-playlist.module.scss'

interface Props extends IEditPlaylist {
  isOpen: boolean
  onClose: () => void
}

export const EditPlaylist = ({
  isOpen,
  onClose,
  id,
  cover,
  title,
  description
}: Props) => {
  const { register, handleSubmit } = useForm<IEditPlaylist>({
    defaultValues: {
      title,
      cover,
      description
    }
  })

  const { mutateAsync, isLoading } = useEditPlaylist()

  const onSubmit = async (data: IEditPlaylist) => {
    console.log(data)

    if (isLoading) {
      toast.error('Изменение сведений...')
      return
    }

    const formData = new FormData()

    formData.append('id', id)
    formData.append('title', data.title)

    if (data.description) {
      formData.append('description', data.description)
    }

    if (data.cover) {
      formData.append('cover', data.cover)
    }

    try {
      await mutateAsync(formData).then(onClose)
    } catch (error) {
      console.log('Error editing playlist', error)
    }
  }

  return (
    <UiModal
      isOpen={isOpen}
      onClose={onClose}
      title='Изменение сведений'
      maxWidth={600}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {cover ? (
          <img src={cover} alt={title} />
        ) : (
          <div className='bg-[#282828] grid place-content-center aspect-square rounded-md'>
            <LuMusic size='100px' color='#b3b3b3' />
          </div>
        )}
        <UiInput register={register('title')} placeholder='Название' />
        <UiInput
          isTextarea
          register={register('description')}
          className='h-full'
          placeholder='Описание'
        />
        <UiButton type='submit'>Сохранить</UiButton>
        <p>
          Продолжая, ты предоставляешь Siftify доступ к выбранному изображению.
          Пожалуйста, не загружай файлы, которые ты не имеешь права
          распространять.
        </p>
      </form>
    </UiModal>
  )
}
