import { IGetRoleArtists } from '#/shared/api/api'
import { useUser } from '#/shared/hooks'
import { RoleEnum } from '#/shared/store/user'
import { UiButton } from '#/shared/ui/UiButton'
import { UiInput } from '#/shared/ui/UiInput'
import { UiLabel } from '#/shared/ui/ui-label'
import { UiModal } from '#/shared/ui/ui-modal'
import { Box } from '@mui/material'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useBoolean } from 'usehooks-ts'
import { useArtistRoleModal } from './useArtistRoleModa'

export const ArtistRoleModal = () => {
  const { role } = useUser()

  if (role !== RoleEnum.USER) {
    return null
  }

  return <ArtistRoleModalContent />
}

const ArtistRoleModalContent = () => {
  const { value, setTrue, setFalse } = useBoolean()

  const { register, handleSubmit, reset } = useForm<IGetRoleArtists>()
  const { mutateAsync } = useArtistRoleModal()

  const onSubmit = async (data: IGetRoleArtists) => {
    console.log(data, 'data')
    await mutateAsync(data)
  }

  const onClose = useCallback(() => {
    setFalse()
    reset()
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <UiLabel>Никнейм</UiLabel>
          <UiInput
            id='Никнейм'
            register={register('name')}
            placeholder='Никнейм'
          />
          <Box sx={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <UiButton type='button' variant='outlined' onClick={onClose}>
              Отмена
            </UiButton>
            <UiButton type='submit'>Подтвердить</UiButton>
          </Box>
        </form>
      </UiModal>
    </>
  )
}
