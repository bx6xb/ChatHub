import { Preloader } from "../../../components/Preloader/Preloader"
import { UserProfileType } from "../ProfileContainer"
import s from "./ProfileInfo.module.css"

type ProfileInfoPropsType = {
  userProfile: UserProfileType
}

// userId: number
// lookingForAJob: boolean
// lookingForAJobDescription: string
// fullName: string
// contacts: {
//   github: string
//   vk: string
//   facebook: string
//   instagram: string
//   twitter: string
//   website: string
//   youtube: string
//   mainLink: string
// }
// photos: {
//   small: string
//   large: string
// }

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
        <img src={props.userProfile.photos.small} alt="user photo" />
        <div>{props.userProfile.fullName}</div>
      </div>
    </div>
  )
}
