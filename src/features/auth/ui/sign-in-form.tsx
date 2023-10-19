import { SignInDto } from '#/shared/api'
import { labelsSignIn } from '#/shared/constants'
import { UiButton } from '#/shared/ui/UiButton'
import { UiInput } from '#/shared/ui/UiInput'
import { ErrorMessage } from '@hookform/error-message'
import clsx from 'clsx'
import { useSignInForm } from '..'

export const SignInForm = () => {
  const { errors, handleSubmit, isLoading, register } = useSignInForm()

  return (
    <form onSubmit={handleSubmit}>
      {labelsSignIn.map(({ label, name, type }, index) => (
        <label
          key={name}
          className={clsx('mb-2 block', {
            'mb-0': labelsSignIn.length === index + 1
          })}>
          <p>{label}</p>
          <UiInput type={type} register={register(name as keyof SignInDto)} />
          <ErrorMessage
            as={<p className='text-red-400 text-sm' />}
            errors={errors}
            name={name as keyof SignInDto}
          />
        </label>
      ))}
      <UiButton
        type='submit'
        className='mt-4 h-12'
        disabled={isLoading}
        loader={isLoading}>
        Register
      </UiButton>
    </form>
  )
}
