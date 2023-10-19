import { useUserStore } from '#/entities/auth'
import { Link, Navigate } from 'react-router-dom'
import { ROUTES } from '../constants'

interface AuthLayoutProps {
  title: string
  children: React.ReactNode
}

export const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  const { user } = useUserStore()

  if (user) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  const isSignUp = title === 'Sign Up'

  return (
    <div className='w-screen h-screen grid place-items-center'>
      <div className='max-w-sm w-full rounded-lg p-8 bg-white/20'>
        <img
          width={70}
          height={70}
          className='block mx-auto mb-2'
          src='/Logo.png'
          alt='Logo'
        />
        <h1 className='text-xl font-bold text-center mb-2'>{title}</h1>
        {children}
        <p className='text-center mt-4 text-gray-200'>
          {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <Link
            to={isSignUp ? ROUTES.SIGN_IN : ROUTES.SIGN_UP}
            className='text-gray-100 hover:text-gray-300 transition-colors duration-200 underline font-bold'>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Link>
        </p>
      </div>
    </div>
  )
}
