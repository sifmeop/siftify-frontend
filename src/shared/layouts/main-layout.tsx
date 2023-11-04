import { AudioPlayer } from '#/widgets/audio-player'
import { Navigation } from '#/widgets/navigation'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div className='flex'>
      <Navigation />
      <div className='w-full'>
        <Outlet />
      </div>
      <AudioPlayer />
    </div>
  )
}
