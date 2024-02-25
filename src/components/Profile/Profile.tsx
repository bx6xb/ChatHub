import s from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts"
import { ProfileInfo } from "./ProfileInfo/ProfileInfo"
import { ProfilePageType } from "../../redux/state"

type ProfilePropsType = {
  state: ProfilePageType
  addPost: (postMessage: string) => void
}

export const Profile = (props: ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts posts={props.state.posts} addPost={props.addPost} />
    </div>
  )
}
