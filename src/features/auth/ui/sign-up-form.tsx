import { SignUpDto } from '#/shared/api'
import { labelsSignUp } from '#/shared/constants'
import { UiButton } from '#/shared/ui/UiButton'
import { UiInput } from '#/shared/ui/UiInput'
import { ErrorMessage } from '@hookform/error-message'
import clsx from 'clsx'
import { useSignUpForm } from '..'

export const SignUpForm = () => {
  const { errors, handleSubmit, isLoading, register } = useSignUpForm()

  return (
    <form onSubmit={handleSubmit}>
      {labelsSignUp.map(({ label, name, type }, index) => (
        <label
          key={name}
          className={clsx('mb-2 block', {
            'mb-0': labelsSignUp.length === index + 1
          })}>
          <p>{label}</p>
          <UiInput type={type} register={register(name as keyof SignUpDto)} />
          <ErrorMessage
            as={<p className='text-red-400 text-sm' />}
            errors={errors}
            name={name as keyof SignUpDto}
          />
        </label>
      ))}
      <UiButton
        type='submit'
        className='mt-4 h-12'
        disabled={isLoading}
        loader={isLoading}>
        Login
      </UiButton>
    </form>
  )
}
