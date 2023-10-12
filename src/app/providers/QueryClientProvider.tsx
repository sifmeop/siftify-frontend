import {
  QueryClient,
  QueryClientProvider as TanStackQueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface Props {
  children: React.ReactNode
}

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
})

export const QueryClientProvider = ({ children }: Props) => {
  return (
    <TanStackQueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </TanStackQueryClientProvider>
  )
}
