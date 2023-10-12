import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div className='w-screen h-screen grid place-items-center'>
      <div className='max-w-xs w-full rounded-lg p-8 bg-white/20'>
        <Outlet />
      </div>
    </div>
  )
}
