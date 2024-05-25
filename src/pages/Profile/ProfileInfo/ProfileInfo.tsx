import { Preloader } from "../../../components/Preloader/Preloader"
import s from "./ProfileInfo.module.css"
import userDefaultPhoto from "../../../assets/images/userDefaultPhoto.png"
import { ProfileStatus } from "./ProfileStatus"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { setUserStatus } from "../../../redux/profileReducer/profileReducer"

export const ProfileInfo = () => {
  const { userProfile, profileStatus } = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()

  const setProfileStatus = (status: string) => {
    dispatch(setUserStatus(status))
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
        <div>{userProfile.fullName}</div>
        <ProfileStatus status={profileStatus} getUserStatus={setProfileStatus} />
      </div>
    </div>
  )
}
