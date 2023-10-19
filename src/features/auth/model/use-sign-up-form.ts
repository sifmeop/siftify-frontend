import { useSignUp } from '#/entities/auth'
import { SignUpDto } from '#/shared/api'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const signUpSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  username: yup
    .string()
    .min(4, 'Username must be at least 4 characters')
    .max(12, 'Username must be at most 12 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(24, 'Password must be at most 24 characters')
    .matches(
      /^[a-zA-Z0-9~!?$\\\-_&#<>.()%@]+$/,
      'Only Latin characters are allowed'
    )
    .matches(
      /(?=.*[a-z])/,
      'Password must contain at least one lowercase letter'
    )
    .matches(
      /(?=.*[A-Z])/,
      'Password must contain at least one uppercase letter'
    )
    .matches(
      /(?=.*[~!?$\-_&#<>.()%@])/,
      'Password must contain at least one special character'
    )
    .matches(/(?=.*\d)/, 'Password must contain at least one digit')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match')
})

export const useSignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpDto>({
    resolver: yupResolver(signUpSchema)
  })

  const { mutate, isLoading } = useSignUp()

  return {
    register,
    handleSubmit: handleSubmit((data) => mutate(data)),
    isLoading,
    errors
  }
}
