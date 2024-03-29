import { AlbumPageWrapper } from '#/pages/album-page'
import { ArtistPageWrapper } from '#/pages/artist-page'
import { FavoriteTracksPage } from '#/pages/favorite-tracks-page'
import { HomePage } from '#/pages/home-page'
import { NotFoundPage } from '#/pages/not-found-page'
import { PlaylistIdPage } from '#/pages/playlist-id-page'
import { ProfilePage } from '#/pages/profile-page'
import { QueuePage } from '#/pages/queue-page'
import { SearchPage } from '#/pages/search-page'
import { SignInPage } from '#/pages/sign-in-page'
import { SignUpPage } from '#/pages/sign-up-page'
import { TrackPageWrapper } from '#/pages/track-page/track-page'
import { UploadTrackPage } from '#/pages/upload-track-page'
import { ROUTES } from '#/shared/constants'
import { AuthGuard, AuthLayout, MainLayout } from '#/shared/layouts'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        element: <HomePage />,
        index: true
      },
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />
      },
      {
        path: ROUTES.QUEUE,
        element: <QueuePage />
      },
      {
        path: ROUTES.SEARCH,
        element: <SearchPage />
      },
      {
        path: ROUTES.ARTIST + '/:id',
        element: <ArtistPageWrapper />
      },
      {
        path: 'track/:id',
        element: <TrackPageWrapper />
      },
      {
        path: ROUTES.ALBUM + '/:id',
        element: <AlbumPageWrapper />
      },
      {
        path: ROUTES.UPLOAD,
        element: <UploadTrackPage />
      },
      {
        path: ROUTES.PLAYLIST + '/:id',
        element: <PlaylistIdPage />
      },
      {
        path: ROUTES.FAVORITE_TRACKS,
        element: <FavoriteTracksPage />
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
