import clsx from 'clsx'
import { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import styles from './Input.module.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn
}

export const Input = ({ register, type = 'text', ...props }: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  const typeIsPassword = type === 'password'
  const ShowPasswordIcon = showPassword ? VscEyeClosed : VscEye

  return (
    <div className={styles.wrapper}>
      <input
        {...register}
        className={clsx(styles.input, {
          [styles.inputPassword]: typeIsPassword
        })}
        type={showPassword ? 'text' : type}
        {...props}
      />
      {typeIsPassword && (
        <button
          onClick={() => setShowPassword((prevValue) => !prevValue)}
          className={styles.passwordIcon}>
          <ShowPasswordIcon size='20px' />
        </button>
      )}
    </div>
  )
}
