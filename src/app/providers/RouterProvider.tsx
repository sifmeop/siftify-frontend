import Home from '#/pages/home'
import { AuthLayout, MainLayout } from '#/pages/layouts'
import { SignUp } from '#/pages/sign-up'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <MainLayout />
      </>
    ),
    children: [
      {
        element: <Home />,
        index: true
      }
    ]
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'sign-up',
        element: <SignUp />
      },
      {
        path: 'sign-in',
        element: <div>Sign in</div>
      }
    ]
  }
])

export const Router = () => {
  return <RouterProvider router={router} />
}
