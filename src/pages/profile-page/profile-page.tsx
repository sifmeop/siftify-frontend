import { ProfileUserInfo } from '#/entities/profile'
import { ArtistRoleModal } from '#/features/artist-role-modal'
import { UploadTracks } from '#/features/upload-tracks'

export const ProfilePage = () => {
  return (
    <div>
      <ProfileUserInfo />
      <ArtistRoleModal />
      <UploadTracks />
    </div>
  )
}
