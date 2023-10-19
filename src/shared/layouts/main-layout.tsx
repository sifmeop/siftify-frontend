import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div>
      <div>маин шапка</div>
      <Outlet />
      <div>маин подвал</div>
    </div>
  )
}
