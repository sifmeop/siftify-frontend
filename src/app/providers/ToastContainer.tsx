import { ToastContainer as ToastifyToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export const ToastContainer = () => {
  return (
    <ToastifyToastContainer
      position='top-left'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
  )
}
