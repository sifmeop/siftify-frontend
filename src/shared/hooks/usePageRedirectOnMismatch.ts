import { useNavigate } from 'react-router-dom'

export const usePageRedirectOnMismatch = () => {
  const navigate = useNavigate()

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    const to = (e.target as HTMLAnchorElement).getAttribute('href')!
    const pathname = window.location.pathname

    if (pathname !== to) navigate(to)
  }

  return { handleNavigate }
}
