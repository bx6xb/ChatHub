import s from "./Profile.module.css"
import { ProfileInfo } from "./ProfileInfo/ProfileInfo"
import { MyPostsContainer } from "./MyPosts/MyPostsContainer"

type ProfilePropsType = {
  store: any // fix type
}

export const Profile = (props: ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo />
      <MyPostsContainer store={props.store} />
    </div>
  )
}
