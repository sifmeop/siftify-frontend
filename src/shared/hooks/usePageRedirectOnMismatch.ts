import { useNavigate } from 'react-router-dom'

export const usePageRedirectOnMismatch = () => {
  const navigate = useNavigate()

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    const pathname = window.location.pathname
    const to = e.currentTarget.attributes.getNamedItem('href')!.value

    if (pathname !== to) navigate(to)
  }

  return { handleNavigate }
}
