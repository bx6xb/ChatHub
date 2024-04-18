import { Preloader } from "../../../components/Preloader/Preloader"
import { UserProfileType } from "../ProfileContainer"
import s from "./ProfileInfo.module.css"
import userDefaultPhoto from "../../../assets/images/userDefaultPhoto.png"

type ProfileInfoPropsType = {
  userProfile: UserProfileType
}

export const ProfileInfo = (props: ProfileInfoPropsType) => {
  if (!props.userProfile) {
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
          src={props.userProfile.photos.small || userDefaultPhoto}
          alt="user photo"
        />
        <div>{props.userProfile.fullName}</div>
      </div>
    </div>
  )
}
