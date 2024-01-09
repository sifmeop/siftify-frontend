import { cn } from '#/shared/lib'
import { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import styles from './UiInput.module.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  classNameContainer?: string
  label?: string
}

export const UiInput = ({
  register,
  type = 'text',
  label,
  iconLeft,
  iconRight,
  classNameContainer,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  const typeIsPassword = type === 'password'
  const ShowPasswordIcon = showPassword ? VscEyeClosed : VscEye

  return (
    <>
      {label && (
        <label htmlFor={label} className='text-sm'>
          {label}
        </label>
      )}
      <div className={cn(styles.wrapper, classNameContainer)}>
        {iconLeft && <div className={styles.iconLeft}>{iconLeft}</div>}
        <input
          id={label}
          {...register}
          className={cn(styles.input, {
            [styles.inputPassword]: typeIsPassword,
            [styles.hasIconLeft]: !!iconLeft,
            [styles.hasIconRight]: !!iconRight
          })}
          type={showPassword ? 'text' : type}
          {...props}
        />
        {iconRight && <div className={styles.iconRight}>{iconRight}</div>}
        {typeIsPassword && (
          <button
            onClick={() => setShowPassword((prevValue) => !prevValue)}
            className={styles.passwordIcon}>
            <ShowPasswordIcon size='20px' />
          </button>
        )}
      </div>
    </>
  )
}
