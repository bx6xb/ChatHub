import {
  ProfilePageStateType,
  addPostAC,
  updateNewPostAC,
} from "../../../redux/profileReducer/profileReducer"
import { MyPosts } from "./MyPosts"
import { AppRootStateType } from "../../../redux/store"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

export const MyPostsContainer = () => {
  const state = useSelector<AppRootStateType, ProfilePageStateType>((state) => state.profilePage)
  const dispatch = useDispatch()

  const addPost = () => {
    dispatch(addPostAC())
  }

  const updateNewPostText = (text: string) => {
    let action = updateNewPostAC(text)
    dispatch(action)
  }

  return (
    <MyPosts
      addPost={addPost}
      updateNewPostText={updateNewPostText}
      newPostText={state.newPostText}
      posts={state.posts}
    />
  )
}
