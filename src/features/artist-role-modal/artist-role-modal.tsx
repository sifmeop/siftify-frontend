import { IGetRoleArtists } from '#/shared/api/api'
import { useUser } from '#/shared/hooks'
import { EnumRole } from '#/shared/store/user'
import { UiButton } from '#/shared/ui/UiButton'
import { UiInput } from '#/shared/ui/UiInput'
import { UiDropzoneCover } from '#/shared/ui/ui-dropzone-cover'
import { UiLabel } from '#/shared/ui/ui-label'
import { UiModal } from '#/shared/ui/ui-modal'
import { Box } from '@mui/material'
import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useBoolean } from 'usehooks-ts'
import { useArtistRoleModal } from './useArtistRoleModa'

export const ArtistRoleModal = () => {
  const { role } = useUser()

  if (role !== EnumRole.USER) {
    return null
  }

  return <ArtistRoleModalContent />
}

const ArtistRoleModalContent = () => {
  const { value, setTrue, setFalse } = useBoolean()

  const methods = useForm<IGetRoleArtists>()
  const { mutateAsync } = useArtistRoleModal()

  const onSubmit = async (data: IGetRoleArtists) => {
    const formData = new FormData()
    formData.append('cover', data.cover)
    formData.append('name', data.name)

    try {
      await mutateAsync(formData)
    } catch (error) {
      console.log('Не удалось получить роль артиста', error)
    }
  }

  const onClose = useCallback(() => {
    setFalse()
    methods.reset()
  }, [])

  return (
    <>
      <div>
        <p>Хотите стать артистом?</p>
        <button onClick={setTrue}>Заполните форму</button>
      </div>
      <UiModal
        isOpen={value}
        onClose={onClose}
        title='Заполните форму для артиста'>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <UiLabel>Фото</UiLabel>
            <UiDropzoneCover />
            <UiLabel>Никнейм</UiLabel>
            <UiInput
              id='Никнейм'
              register={methods.register('name')}
              placeholder='Никнейм...'
            />
            <Box sx={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <UiButton type='button' variant='outlined' onClick={onClose}>
                Отмена
              </UiButton>
              <UiButton type='submit'>Подтвердить</UiButton>
            </Box>
          </form>
        </FormProvider>
      </UiModal>
    </>
  )
}
