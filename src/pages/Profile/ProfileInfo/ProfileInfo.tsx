import { Preloader } from "../../../components/Preloader/Preloader"
import s from "./ProfileInfo.module.css"
import userDefaultPhoto from "../../../assets/images/userDefaultPhoto.png"
import { ProfileStatus } from "./ProfileStatus"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { setProfilePhoto, setProfileStatus } from "../../../redux/profileReducer/profileReducer"
import { ChangeEvent } from "react"

export const ProfileInfo = () => {
  const { userProfile, profileStatus } = useAppSelector((state) => state.profile)
  const authUserId = useAppSelector((state) => state.auth.id)
  const dispatch = useAppDispatch()

  const setUserStatus = (status: string) => {
    dispatch(setProfileStatus(status))
  }
  const onSetProfilePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const photo = e.currentTarget.files[0]
      dispatch(setProfilePhoto(photo))
    }
  }

  if (!userProfile) {
    return <Preloader />
  }

  return (
    <div>
      <div>
        <img src="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350" />
      </div>
      <div className={s.descriptionBlock}>
        <img
          className={s.userPhoto}
          src={userProfile.photos.small || userDefaultPhoto}
          alt="user photo"
        />
        {userProfile.userId === authUserId && (
          <label>
            Set photo <input type="file" onChange={onSetProfilePhoto} />
          </label>
        )}
        <div>{userProfile.fullName}</div>
        <ProfileStatus status={profileStatus} setUserStatus={setUserStatus} />
      </div>
    </div>
  )
}
