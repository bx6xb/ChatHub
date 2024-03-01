import s from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts"
import { ProfileInfo } from "./ProfileInfo/ProfileInfo"
import { ActionType, ProfilePageType } from "../../redux/state"

type ProfilePropsType = {
  state: ProfilePageType
  dispatch: (action: ActionType) => void
}

export const Profile = (props: ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts
        posts={props.state.posts}
        newPostText={props.state.newPostText}
        dispatch={props.dispatch}
      />
    </div>
  )
}
