import { ProfileUserInfo } from '#/entities/profile'
import { ArtistRoleModal } from '#/features/artist-role-modal'

export const ProfilePage = () => {
  return (
    <div>
      <ProfileUserInfo />
      <ArtistRoleModal />
    </div>
  )
}
