import { StrictMode } from 'react'
import { QueryClientProvider } from './QueryClientProvider'
import { Router } from './RouterProvider'
import { ToastContainer } from './ToastContainer'

export const Provider = () => {
  return (
    <StrictMode>
      <QueryClientProvider>
        <ToastContainer />
        <Router />
      </QueryClientProvider>
    </StrictMode>
  )
}
