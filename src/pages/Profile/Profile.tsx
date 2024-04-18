import s from "./Profile.module.css"
import { ProfileInfo } from "./ProfileInfo/ProfileInfo"
import { MyPostsContainer } from "./MyPosts/MyPostsContainer"
import { UserProfileType } from "../../api/api"

type ProfilePropsType = {
  userProfile: UserProfileType
}

export const Profile = (props: ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo userProfile={props.userProfile} />
      <MyPostsContainer />
    </div>
  )
}
