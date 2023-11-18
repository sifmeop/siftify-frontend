import { UiLoader } from '../ui-loader'

export const UiFullScreenLoader = () => {
  return (
    <div className='fixed inset-0 grid place-items-center'>
      <UiLoader />
    </div>
  )
}
