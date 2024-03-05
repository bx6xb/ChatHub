import { addPostAC, updateNewPostAC } from "../../../redux/profileReducer"
import { StoreType } from "../../../redux/state"
import { MyPosts } from "./MyPosts"

type MyPostsContainer = {
  store: StoreType
}

export const MyPostsContainer = (props: MyPostsContainer) => {
  const state = props.store.getState()
  const dispatch = props.store.dispatch

  const addPost = () => {
    let action = addPostAC()
    dispatch(action)
  }

  const onPostChange = (text: string) => {
    let action = updateNewPostAC(text.trim())
    dispatch(action)
  }

  return (
    <MyPosts
      updateNewPostText={onPostChange}
      addPost={addPost}
      posts={state.profilePage.posts}
      newPostText={state.profilePage.newPostText}
    />
  )
}
