import { ToastContent, toast } from 'react-toastify'

export const toastBottom = (content: ToastContent<unknown>) => {
  return toast(content, {
    position: 'top-center',
    hideProgressBar: true,
    closeOnClick: true,
    closeButton: false,
    style: {
      padding: '10px',
      fontWeight: 500,
      fontFamily: 'var(--font-family)',
      fontSize: '14px',
      color: 'var(--dark)'
    }
  })
}
