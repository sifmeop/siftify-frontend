import { HomePage } from '#/pages/home-page'
import { NotFoundPage } from '#/pages/not-found-page'
import { SearchPage } from '#/pages/search-page'
import { SignInPage } from '#/pages/sign-in-page'
import { SignUpPage } from '#/pages/sign-up-page'
import { AuthLayout, MainLayout } from '#/shared/layouts'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      // <AuthGuard>*/}
      <MainLayout />
      // </AuthGuard>
    ),
    children: [
      {
        element: <HomePage />,
        index: true
      },
      {
        path: 'search',
        element: <SearchPage />
      }
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'sign-up',
        element: (
          <AuthLayout title='Sign Up'>
            <SignUpPage />
          </AuthLayout>
        )
      },
      {
        path: 'sign-in',
        element: (
          <AuthLayout title='Sign In'>
            <SignInPage />
          </AuthLayout>
        )
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])

export const Router = () => {
  return <RouterProvider router={router} />
}
