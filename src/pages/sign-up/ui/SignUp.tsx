import { useSignUp } from '#/entities'
import { SignUpDto } from '#/shared/api'
import { Button } from '#/shared/ui/Button'
import { Input } from '#/shared/ui/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { signUpSchema } from '../model'

export const SignUp = () => {
  const { register, handleSubmit } = useForm<SignUpDto>({
    resolver: yupResolver(signUpSchema)
  })

  const { mutateAsync } = useSignUp()

  const handleRegister = async (data: SignUpDto) => {
    await mutateAsync({
      email: data.email,
      username: data.username,
      password: data.password,
      confirmPassword: data.confirmPassword
    }).then((res) => console.log(res, 'RES'))
  }

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <h1>SignUp</h1>
      <div>
        <p>email</p>
        <Input register={register('email')} />
      </div>
      <div>
        <p>username</p>
        <Input register={register('username')} />
      </div>
      <div>
        <p>password</p>
        <Input type='password' register={register('password')} />
      </div>
      <div>
        <p>confirmPassword</p>
        <Input type='password' register={register('confirmPassword')} />
      </div>
      <Button type='submit'>Register</Button>
    </form>
  )
}
