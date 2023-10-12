import * as yup from 'yup'

export const signUpSchema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().min(8).max(24).required(),
  confirmPassword: yup.string().min(8).max(24).required()
})
